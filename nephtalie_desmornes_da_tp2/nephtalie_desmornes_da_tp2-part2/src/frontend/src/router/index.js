import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cours',
    name: 'Cours',
    // Lazy-loading for better performance
    component: () => import('../views/Cours.vue')
  },
  {
    path: '/styles',
    name: 'Styles',
    component: () => import('../views/Styles.vue')
  },
  {
    path: '/professeurs',
    name: 'Professeurs',
    component: () => import('../views/Professeurs.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../views/FAQ.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
