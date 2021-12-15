import axios from 'axios'
import store from '@/store'
import router from '@/router'
if (process.env.NODE_ENV == 'development') { axios.defaults.baseURL = 'http://localhost:8080'; } else if (process.env.NODE_ENV == 'debug') { axios.defaults.baseURL = 'http://localhost:8080'; } else if (process.env.NODE_ENV == 'production') { axios.defaults.baseURL = 'http://samblana.vos.systems:8000'; }

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
  if (!error.response) {
    if (error.status === 401) {
      if (router.currentRoute.path !== '/login') {
        router.replace('/login')
      }
    }
  } else {
    console.log(error)
    return Promise.reject(error)
  }
})
const request = axios
export default request