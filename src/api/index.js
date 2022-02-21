import request from './request'

export const reqRandomWords = (n=10) => request({
  method: 'GET',
  url: `/api/random/${n}`
})
export const reqLemmaWord = (word) => request({
  method: 'GET',
  url: '/api/lemma/' + word,
})
export const reqGetBalance = () => request({
  method: 'GET',
  url: '/api/balance',
})
export const reqNftIds = (contractId,address) => request({
  method: 'GET',
  url: '/indexer/associatedtokens/' + contractId + '/' + address,
})
export const reqNftContractId = () => request({
  method: 'GET',
  url: '/api/contractid'
})
export const reqGetLastSaved = () => request({
  method: 'GET',
  url: '/api/lastsaved',
})
export const reqGetCountNFT = () => request({
  method: 'GET',
  url: '/api/countnft',
})
export const reqGetCountSaved = () => request({
  method: 'GET',
  url: '/api/countsaved',
})
export const reqSaveWordId = (wordIdArr) => request({
  method: 'post',
  url: '/api/save',
  data: wordIdArr
})
export const reqInspectNft = (data) => request({
  method: 'post',
  url: '/api/inspectnft',
  data
  // data: ["TWst8k7NgZNzxiXSncex9uvSzt4kSaJZE8qwUDg8M", "TWst8k7NgZNzxiXSncex9uvSzt4kSaJZE8r3B7pgP"]
})
export const reqFetchDefinition = (data) => request({
  method: 'post',
  url: '/api/fetchdefinition',
  data
})
export const reqMintNft = (data) => request({
  method: 'post',
  url: '/api/mintnft',
  data
  // data: {'ATwAPYdriV1aRXAWYmLViW7Y6K5Jb5bZDkT': wordIdArr}
})