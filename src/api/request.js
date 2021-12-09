import axios from 'axios'
import store from '@/store'
import router from '@/router'

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