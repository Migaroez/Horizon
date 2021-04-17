import MerkleStarter from "@/contracts/MerkleStarter.json";
import IERC20 from "@/contracts/IERC20.json";
import BN from "bn.js";
import UnboundWeb3 from "@/store/web3/unbound.js";

const starterAddress = process.env.VUE_APP_LAUNCHPAD_STARTER_ADDRESS;
const tokenAddress = process.env.VUE_APP_LAUNCHPAD_TOKEN_ADDRESS;
const tokenzeroes = process.env.VUE_APP_LAUNCHPAD_TOKEN_ZEROES;

let starter;
let token;
export default {
  initialize: async function (context) {
    if (context.rootState.web3.isInitialized !== true) {
      await context.dispatch("web3.initialize");
    }
    // console.log(starterAddress, tokenAddress);
    // console.log(MerkleStarter.abi, IERC20.abi);
    starter = new UnboundWeb3.web3.eth.Contract(
      MerkleStarter.abi,
      starterAddress
    );
    token = new UnboundWeb3.web3.eth.Contract(IERC20.abi, tokenAddress);
  },
  connect: async function (context) {
    context.commit(
      "app/addLoadingMessage",
      { message: "Loading Launchpad", key: "launchpad" },
      { root: true }
    );
    context.addLoadingMessage;
    let currentAccount = context.rootState.web3.accounts[0];

    context.commit(
      "app/addLoadingMessage",
      {
        message: "Loading Tranches",
        key: "launchpad-tranches",
      },
      { root: true }
    );
    let tranche = await starter.methods
      .tranches()
      .call({ from: currentAccount });

    let claimableAmount = 0;
    const tranches = [];
    const proofs = [];
    const balances = [];
    context.commit("app/removeLoadingMessage", "launchpad-tranches", {
      root: true,
    });

    for (let i = 0; i < tranche; i++) {
      context.commit(
        "addLoadingMessage",
        {
          message: "Processing tranche " + i + "/" + tranche,
          key: "launchpad-tranche",
        },
        { root: true }
      );
      const isClaimed = await starter.methods.claimed(i, currentAccount).call();
      if (isClaimed) {
        continue;
      }
      let res;
      res = await fetch(
        `${process.env.VUE_APP_LAUNCHPAD_SERVER_URL}/proof/${i}/${currentAccount}`
      );
      if (res.status !== 200) continue;
      let { proof } = await res.json();
      res = await fetch(
        `${process.env.VUE_APP_LAUNCHPAD_SERVER_URL}/status/${i}/${currentAccount}`
      );
      if (res.status !== 200) continue;
      let { amount } = await res.json();
      claimableAmount += parseInt(amount);
      amount = new BN(amount + tokenzeroes);
      tranches.push(i);
      proofs.push(proof);
      balances.push(amount);
      context.commit("app/removeLoadingMessage", "launchpad-tranche", {
        root: true,
      });
    }

    context.commit("setClaimableAmount", claimableAmount);
    context.commit("setStarter", starter);
    context.commit("setToken", token);
    context.commit("setTranche", tranche);
    context.commit("setTranches", tranches);
    context.commit("setProofs", proofs);
    context.commit("setBalances", balances);

    context.commit("app/removeLoadingMessage", "launchpad", { root: true });
  },
};
