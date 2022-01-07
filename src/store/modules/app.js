const state = {
  curWallet: {},
  words: [],
  net: process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet',
  isSwappable: true,
  tokens: []
}

const mutations = {
  updateWallet (state, params) {
    state.curWallet = Object.assign({}, state.curWallet, params)
  },
  updateIsSwappable (state, val) {
    state.isSwappable = val
  },
  updateNet (state, net) {
    // if (state.net !== net) {
    //   state.net = net
    // }
  },
  updateTokens (state, tokens) {
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
