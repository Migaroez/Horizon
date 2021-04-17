export default {
  addLoadingMessage(state, messageObject) {
    state.loadingMessages.push(messageObject);
  },
  removeLoadingMessage(state, key) {
    const index = state.loadingMessages.findIndex((item) => item.key === key);
    if (index > -1) {
      state.loadingMessages.splice(index, 1);
    }
  },
};
