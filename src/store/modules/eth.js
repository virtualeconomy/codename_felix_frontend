/* eslint-disable no-unused-vars */
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

const metaMaskProvider = getMetaMask()
const web3 = new Web3(metaMaskProvider)

function getMetaMask () {
  let provider
  if (window.ethereum && window.ethereum.isMetaMask) {
    provider = window.ethereum
    // window.ethereum.request({
    //   method: 'eth_requestAccounts'
    // }).then(data => {
    //   console.log('Success get metaMask account: ', data)
    // }).catch(error => {
    //   console.log('User denied account access: ', error)
    // })
  } else if (window.web3) {
    provider = window.web3.currentProvider
  } else {
    console.error('plugin is not installed')
  }
  return provider
}

// get eth tx hash result if send success
async function sendTransaction (to, data, value = '0') {
  try {
    const result = await metaMaskProvider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: metaMaskProvider.selectedAddress,
          to: to,
          value: value, // eth value
          gasPrice: '0x2540be400', // 10 gwei
          // gas: '0x989680', // gas limit 10000000
          gas: '0x1e8480', // gas limit 2000000
          data: data
        }
      ]
    })
    console.log('send eth transaction success: ', result)
    return result
  } catch (error) {
    console.log('send eth transaction error: ', error)
    return error
  }
}
// invoked when taker lock
async function getSecretHash (hash) {
  const res = await getTxDetail(hash)
  if (res.result === false || res.code) {
    return ''
  }
  const input = res.input
  const secretHash = input.params[0].value
  return secretHash
}

async function getSecret (hash) {
  const res = await getTxDetail(hash)
  if (res.result && res.result === false) {
    return ''
  }
  const input = res.input
  const secret = input.params[1].value
  return secret
}
async function getTxDetail (hash) {
  try {
    const txdata = await web3.eth.getTransaction(hash)
    const input = txdata.input
    if (input) {
      const res = abiDecoder.decodeMethod(input)
      // check tx for taker lock or maker solve puzzle
      txdata.input = res
    }
    return txdata
  } catch (e) {
    console.log(e)
    return { result: false }
  }
}

const state = {
  wallet: {},
  words: []
}

const mutations = {
  updateWallet (state, params) {
    state.wallet = Object.assign({}, state.wallet, params)
  },
  updateChain (state, net) {
    state.chain = net
  }
}
const actions = {
  async getAccount ({ commit, state, dispatch }) {
    const err = {
      result: false
    }
    const { ethereum } = window
    if (!ethereum || !ethereum.isMetaMask) {
      err.message = 'plugin is not installed'
      return err
    }
    err.message = 'failed to load wallet'
    try {
      const params = {}
      const walletInfo = await ethereum.request({ method: 'eth_chainId' })
      const chainId = {
        '0x1': 'Ethereum Mainnet',
        '0x3': 'testnet',
        '0x4': 'testnet',
        '0x5': 'testnet',
        '0x2a': 'testnet',
        '0x38': 'Binance Smart Chain'
      }
      if (walletInfo != "0x38") {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x38',
                    chainName: 'Binance Smart Chain Mainnet',
                    rpcUrls: ['https://bsc-dataseed1.ninicoin.io'] /* ... */,
                  },
                ],
              });
            } catch (addError) {
              err.message = 'failed to switch chain'
              return err
              // handle "add" error
            }
          } else if (switchError.code === 4001) {
            // User rejected the request
            err.message = 'failed to load wallet'
            return err
          }
        }
      }

      if (walletInfo) {
        params.net = chainId[walletInfo] || 'testnet'
        commit('updateChain', params.net)
      }

      const res = await ethereum.request({ method: 'eth_requestAccounts' })
      if (res && res.length > 0) {
        params.address = res[0]
        params.walletName = 'eth'
        commit('updateWallet', params)
        commit('app/updateWallet', params, { root: true })
        dispatch('app/checkAppNet', null, { root: true })
      }
      return params
    } catch (e) {
      if (e.code === 4001) {
        err.message = 'user reject connect MetaMask'
      }
    }
    return err
  },

  async getBalance ({ commit, state }, contractId) {
    const err = {
      result: false
    }
    const { ethereum } = window
    if (!ethereum || !ethereum.isMetaMask) {
      err.message = 'plugin is not installed'
      return err
    }
    if (state.wallet.address === '') {
      err.message = 'connect metamask first'
      return err
    }
    if (contractId) {
      // get tokenId balance
      const web3Tool = new Web3(window.ethereum)
      const address = state.wallet.address
      const tokenInst = new web3Tool.eth.Contract(tokenABI, contractId)
      const amount = await tokenInst.methods.balanceOf(address).call()
      const params = {
        amount: BigNumber(amount).dividedBy(1e18).toFixed(3).toString()
      }
      commit('updateWallet', params)
      return params
    } else {
      try {
        const res = await ethereum.request({ method: 'eth_getBalance', params: [state.wallet.address, 'latest'] })
        if (res) {
          const amount = Web3.utils.fromWei(res, 'ether')
          const params = {
            amount
          }
          commit('updateWallet', params)
          return params
        }
      } catch (e) {
        console.log(e)
      }
      err.message = 'failed to load wallet'
      return err
    }
  },
  // https://eth.wiki/json-rpc/API#eth_sign
  async signContent ({ _, state }, jsonStr) {
    const err = {
      result: false
    }
    const { ethereum } = window
    if (!ethereum || !ethereum.isMetaMask) {
      err.message = 'plugin is not installed'
      return err
    }
    if (state.wallet.address === '') {
      err.message = 'connect metamask first'
      return err
    }
    try {
      const res = {
        result: true
      }
      const sign = await ethereum.request({ method: 'personal_sign', params: [state.wallet.address, jsonStr] })
      res.signature = sign
      res.publicKey = state.wallet.address
      return res
    } catch (e) {
      console.log(e)
      err.message = e.toString()
      return err
    }
  },
  async getTxTimestamp ({ commit, state }, data) {
    const { hash } = data
    const txData = await web3.eth.getTransaction(hash)
    const blockHash = txData.blockHash
    const blockData = await web3.eth.getBlock(blockHash)
    const timestamp = blockData.timestamp
    return timestamp
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
