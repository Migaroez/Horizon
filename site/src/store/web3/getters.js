export default {
  connectString: function (state) {
    return state.isInitialized === false
      ? "Initializing"
      : state.walletIsInstalled === false
      ? "Please install a web3 compatible wallet"
      : !state.accounts || state.accounts.length < 1
      ? "Connect"
      : state.accounts[0].substring(0, 12) + "...";
  },
  isAccountActive: function (state) {
    return state.accounts && state.accounts.length > 0;
  },
};
