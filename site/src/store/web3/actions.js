import Web3 from "web3";
import DetectEthereumProvider from "@metamask/detect-provider";
import UnboundWeb3 from "@/store/web3/unbound.js";

export default {
  initialize: async function ({ commit, state }) {
    if (state.isInitialized) {
      return;
    }

    let provider;
    let web3;
    DetectEthereumProvider().then((result) => {
      provider = result;
      if (provider) {
        web3 = new Web3();
        web3.setProvider(provider);
        commit("setWalletFound");
      } else {
        console.log("No web3 compatible wallet found");
        return;
      }

      // subscribe to events
      window.ethereum.on("accountsChanged", (accountResponse) =>
        commit("setAccounts", accountResponse)
      );

      UnboundWeb3.web3 = web3;
      UnboundWeb3.provider = provider;
      commit("setInitialized");
    });
  },
  connect: function ({ state, commit }) {
    if (state.isInitialized != true || state.walletIsInstalled != true) {
      console.log("cant connect | not initialized");
      return;
    }
    window.ethereum
      .send("eth_requestAccounts")
      .then(
        UnboundWeb3.web3.eth
          .getAccounts()
          .then((accountResponse) => commit("setAccounts", accountResponse))
      );
  },
};
