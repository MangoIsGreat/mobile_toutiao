import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import home from '../views/home/index.vue'
import layout from '../views/layout/layout.vue'
import my from '../views/my/my.vue'
import search from '../views/search/search.vue'
import searchResult from '../views/searchResult/searchResult.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/checkLogin',
    component: login
  },
  {
    path: '/layout',
    component: layout,
    children: [
      {
        path: '/home',
        component: home
      },
      {
        path: '/my',
        component: my
      },
      {
        path: '/search',
        component: search
      }
    ]
  },
  {
    path: '/searchResult/:key', // 设置动态路由
    component: searchResult
  }
]

const router = new VueRouter({
  routes
})

export default router
