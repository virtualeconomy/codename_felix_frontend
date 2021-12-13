import Vue from 'vue'
import Vuex from 'vuex'
import bs58 from 'bs58'

// const TESTNET_IP = 'http://veldidina.vos.systems:9928'
// const MAINNET_IP = 'https://wallet.v.systems/api'
// const NETWORK_BYTE = 'T'.charCodeAt(0)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wallet: {},
    words: []
  },
  mutations: {
    updateWallet(state, params) {
      state.wallet = Object.assign({}, state.wallet, params)
    },
    savedWords(state, params) {
      state.words = params
    },
    async sendToken(state, data) {
      const res = await window.vsys.request({
        method: 'send',
        params:
        {
          publicKey: data.publicKey,
          recipient: data.recipient,
          amount: data.amount,// string
          description: data.description && '<v-words>'
        }
      })
      return res
    },
  },
  actions: {
    async getAccount({ commit, state, dispatch }) {
      const err = {
        result: false
      }
      if (!window.vsys || !window.vsys.isInstalled) {
        err.message = 'plugin is not installed'
        return err
      }
      const params = {}
      const walletInfo = await window.vsys.request({ method: 'info' })
      if (walletInfo && walletInfo.result === true) {
        params.net = walletInfo.network.toLowerCase()
      }

      const res = await window.vsys.request({ method: 'publicKey' })
      if (res.message === 'OK' && res.result) {
        params.address = res.address
        params.publicKey = res.publicKey
        params.wallet = 'vsys'
        commit('updateWallet', params)
        return params
      }

      err.message = 'failed to load wallet'
      return err
    },

    async signContent({ _, state }, jsonStr) {
      const err = {
        result: false
      }
      if (!window.vsys || !window.vsys.isInstalled) {
        err.message = 'plugin is not installed'
        return err
      }
      if (!state.wallet.publicKey || state.wallet.publicKey === '') {
        err.message = 'connect wallet please'
        return err
      }
      const content = bs58.encode(Buffer.from(jsonStr))
      const res = await window.vsys.request({
        method: 'signContent',
        params:
        {
          publicKey: state.wallet.publicKey,
          content
        }
      })
      if (res && res.result === true) {
        res.publicKey = state.wallet.publicKey
      }
      return res
    }
  },
  modules: {
  }
})
