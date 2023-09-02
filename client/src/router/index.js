import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'character',
      component: () => import('../views/CharacterView.vue')
    },
    {
      path: '/comics',
      name: 'comic',
      component: () => import('../views/ComicView.vue')
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('../views/SeriesView.vue')
    },
    {
      path: '/myfavorites',
      name: 'myfavorites',
      component: () => import('../views/MyfavoriteView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.name === 'bookmarks' && !localStorage.access_token) {
    return false
  } else if ((to.name === 'login' || to.name === 'register') && localStorage.access_token) {
    return false
  }
})

export default router
