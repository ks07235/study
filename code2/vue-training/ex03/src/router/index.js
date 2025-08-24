import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 홈 화면
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // 정보 화면
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // 메뉴 화면
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
    },
  ],
})

export default router
