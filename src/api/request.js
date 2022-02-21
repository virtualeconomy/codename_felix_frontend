import axios from 'axios'
import store from '@/store'
import router from '@/router'
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
}, error => {
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
  return Promise.reject(error)
})
const request = axios
export default request
