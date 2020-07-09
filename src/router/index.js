import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/publish.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('../views/info.vue')
  },
  {
    path: '/modifypsw',
    name: 'Modifypsw',
    component: () => import('../views/modifypsw.vue')
  },
   {
    path: '/indexDetail',
    name: 'indexDetail',
    component: () => import('../views/indexDetail.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/article.vue')
  },
  {
    path: '/articleDetail/:id',
    name: 'ArticleDetail',
    component: () => import('../views/articleDetail.vue')
  },
  {
    path: '/modifyArticle/:id',
    name: 'modifyArticle',
    component: () => import('../views/modifyArticle.vue')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/collect.vue')
  },
  {
    path: '/back',
    name: 'Back',
    component: () => import('../views/back.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
