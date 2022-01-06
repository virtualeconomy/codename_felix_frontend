const state = {
  curWallet: {},
  net: process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet',
  isSwappable: true,
  tokens: []
}

const mutations = {
  updateAppWallet (state, params) {
    state.curWallet = params
  },
  updateIsSwappable (state, val) {
    state.isSwappable = val
  },
  updateAppNet (state, net) {
    // if (state.net !== net) {
    //   state.net = net
    // }
  },
  updateAppTokens (state, tokens) {
    if (tokens !== undefined && tokens !== null && tokens.length > 0) {
      state.tokens = Object.assign([], tokens)
    }
  }
}
const actions = {
  checkAppNet ({ commit, rootState }) {
    if (rootState.vsys.wallet.net && rootState.eth.wallet.net) {
      const isSwappable = rootState.vsys.wallet.net === rootState.eth.wallet.net
      commit('updateIsSwappable', isSwappable)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
