import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WordDetail from '../views/WordDetail.vue'
import WordSave from '../views/WordSave.vue'
import WordPay from '../views/WordPay.vue'
import WordFinish from '../views/WordFinish.vue'
import SavedWords from '../views/Settings/SavedWords.vue'
import About from '../views/Settings/About.vue'
import SignOut from '../views/Settings/SignOut.vue'
import TransId from '../views/Settings/TransId.vue'
import DeviceSettings from '../views/Settings/DeviceSettings.vue'
import Settings from '../views/Settings/Settings.vue'
import Gallery from '../views/Gallery.vue'
import ConnectWallet from '../views/ConnectWallet.vue'
import MintSuccess from '../views/MintSuccess.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/word_save',
    name: 'WordSave',
    component: WordSave
  },
  {
    path: '/word_pay',
    name: 'WordPay',
    component: WordPay
  },
  {
    path: '/word_finish',
    name: 'WordFinish',
    component: WordFinish
  },
  {
    path: '/mint_success',
    name: 'MintSuccess',
    component: MintSuccess
  },
  {
    path: '/settings/device_settings',
    name: 'DeviceSettings',
    component: DeviceSettings
  },
  {
    path: '/settings/saved_words',
    name: 'SavedWords',
    component: SavedWords
  },
  {
    path: '/settings/about',
    name: 'About',
    component: About
  },
  {
    path: '/connect_wallet',
    name: 'ConnectWallet',
    component: ConnectWallet
  },
  {
    path: '/settings/sign_out',
    name: 'SignOut',
    component: SignOut
  },
  {
    path: '/settings/trans_id',
    name: 'TransId',
    component: TransId
  },
  {
    path: '/gallery',
    name: 'Gallery',
    components: { gallery: Gallery }
  },
  {
    path: '/word_detail',
    name: 'Detail',
    component: () => import('../views/WordDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
