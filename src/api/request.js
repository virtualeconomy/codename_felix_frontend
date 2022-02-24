import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

// if (process.env.NODE_ENV == 'development') { axios.defaults.baseURL = 'http://localhost:8080'; } else if (process.env.NODE_ENV == 'debug') { axios.defaults.baseURL = 'http://localhost:8080'; } else if (process.env.NODE_ENV == 'production') { axios.defaults.baseURL = 'https://saveaword.com/api'; }
if (process.env.NODE_ENV == 'development') { axios.defaults.baseURL = 'http://localhost:8080'; } else if (process.env.NODE_ENV == 'debug') { axios.defaults.baseURL = 'http://localhost:8080'; } else if (process.env.NODE_ENV == 'production') { axios.defaults.baseURL = 'https://staging.vsystems.dev'; }
// const base = 'http;//localhost:8080'

axios.create({
  // baseURL: base, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000
})

axios.interceptors.request.use(config => {
  const { method, data } = config
  if (method.toUpperCase() === 'POST' && data instanceof Object) { }
  return config
})

axios.interceptors.response.use(response => {
  return response.data
}, err => {
  console.log(err.response.data)
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = 'This NFT is already issued!'; break;
      case 403: err.message = 'Connect Deny'; break;
      case 404: err.message = 'Not Found'; break;
      case 408: err.message = 'Time Out'; break;
      case 429: err.message = err.response.data.title; break;
      case 500: err.message = 'Server Connection Failed'; break;
      default: err.message = `Connect fail(${err.response.status})!`;
    }
  } else {
    err.message = 'Connect Server Fail!'
  }
  Message.error(err.message);
  // if (error.response) {
  //   if (error.response.status === 401) {
  //     if (router.currentRoute.path !== '/login') {
  //       router.replace('/login')
  //     }
  //   }
  //   if (error.response.status === 500) {
  //     alert(error.response.data)
  //   }
  //   return error.response
  // } else {
  //   console.log(error)
  //   return Promise.reject(error)
  // }
  return Promise.reject(err)
})
const request = axios
export default request
