export default {
  setAccounts(state, accounts) {
    state.accounts = accounts;
  },
  setWalletFound(state) {
    state.walletIsInstalled = true;
  },
  setInitialized(state) {
    state.isInitialized = true;
  },
};
