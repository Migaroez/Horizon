import Vue from "vue";
import Vuex from "vuex";

import app from "./app";
import web3 from "./web3";
import launchpad from "./launchpad";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    web3: web3,
    app: app,
    launchpad: launchpad,
  },
});
