import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WordDetail from '../views/WordDetail.vue'
import WordSave from '../views/WordSave.vue'
import WordPay from '../views/WordPay.vue'
import WordFinish from '../views/WordFinish.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
