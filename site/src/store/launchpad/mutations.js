export default {
  setClaimableAmount: function (state, value) {
    state.claimableAmount = value;
  },
  // setStarter : function(state, value){
  // },
  // setToken : function(state, value){
  // },
  setTranche: function (state, value) {
    state.tranche = value;
  },
  setTranches: function (state, value) {
    state.tranches = value;
  },
  setProofs: function (state, value) {
    state.proofs = value;
  },
  setBalances: function (state, value) {
    state.balances = value;
  },
};
