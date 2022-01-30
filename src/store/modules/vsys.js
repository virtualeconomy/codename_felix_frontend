import bs58 from 'bs58'
import BigNumber from "bignumber.js";

var state = {
  wallet: {},
  words: []
}
var mutations = {
  updateWallet(state, params) {
    console.log(params)
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
}
var actions = {
  async getAccount({ commit, state, dispatch }) {
    const err = {
      result: false
    }
    if (!window.vsys || !window.vsys.isInstalled) {
      err.message = 'V wallet extension is not installed'
      return err
    }
    const params = {}
    const walletInfo = await window.vsys.request({ method: 'info' })
    if (walletInfo && walletInfo.result === true) {
      params.net = walletInfo.network.toLowerCase()
    }

    const amountRes = await window.vsys.request({ method: 'amount' })
    if (amountRes.message === 'OK' && amountRes.result) {
      params.amount = BigNumber(amountRes.amount).toFixed(2).toString()
    }

    const res = await window.vsys.request({ method: 'publicKey' })
    if (res.message === 'OK' && res.result) {
      params.address = res.address
      params.publicKey = res.publicKey
      params.walletName = 'vsys'
      params.result = true
      commit('updateWallet', params)
      // update curWallet in app modules
      commit('app/updateWallet', params, { root: true })
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
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}