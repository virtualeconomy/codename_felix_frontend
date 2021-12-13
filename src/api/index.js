import request from './request'

export const reqRandomWords = (n=10) => request({
  method: 'GET',
  url: `/random/${n}`
})

export const reqLemmaWord = (word) => request({
  method: 'GET',
  url: '/lemma/' + word,
})
export const reqGetAddress = () => request({
  method: 'GET',
  url: '/address',
})
export const reqGetBalance = (address) => request({
  method: 'GET',
  url: '/balance/' + address,
})
export const reqSaveWordId = (wordIdArr) => request({
  method: 'post',
  url: 'save',
  data: wordIdArr
})
export const createPair = async (pairInfo, whichWallet = 'vsys') => {
  const res = await signRequest(pairInfo, whichWallet)
  return request({
    url: '/swap/pair/create',
    method: 'post',
    data: res.body,
    headers: {
      publicKey: res.publicKey,
      signature: res.signature
    }
  })
}
