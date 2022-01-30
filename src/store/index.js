import Vue from 'vue'
import Vuex from 'vuex'

// const TESTNET_IP = 'http://veldidina.vos.systems:9928'
// const MAINNET_IP = 'https://wallet.v.systems/api'
// const NETWORK_BYTE = 'T'.charCodeAt(0)

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
console.log(modulesFiles)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})

export default store
