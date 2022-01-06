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
import DeviceSettings from '../views/Settings/DeviceSettings.vue'
import Settings from '../views/Settings/Settings.vue'
import Gallery from '../views/Gallery.vue'
import ConnectWallet from '../views/ConnectWallet.vue'




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

export default router
