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
    {       // 로그인 화면
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {       // 메뉴 화면
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
    },
    {         // 마이페이지
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/MyPageView.vue'),
    },
    {       // 회원가입 화면
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
    },  
  ],
})

export default router
