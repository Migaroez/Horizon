// Store functionality
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
