import Web3 from "web3";
import DetectEthereumProvider from "@metamask/detect-provider";

let web3; //if we store it in vuex it gets wrapped and we get errors
export default {
  initialize: function ({ commit }) {
    let provider;
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

      //subscribe to events
      window.ethereum.on("accountsChanged", (accountResponse) =>
        commit("setAccounts", accountResponse)
      );

      commit("setInitialized");
    });
  },
  connect: function ({ state, commit }) {
    console.log("web/connect called");
    console.group(state);
    if (state.isInitialized != true || state.walletIsInstalled != true) {
      console.log("cant connect | not initialized");
      return;
    }
    window.ethereum
      .send("eth_requestAccounts")
      .then(
        web3.eth
          .getAccounts()
          .then((accountResponse) => commit("setAccounts", accountResponse))
      );
  },
};
