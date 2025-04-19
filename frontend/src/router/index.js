import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import TaskView from '../views/TaskHomeView.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: AuthView,
      meta: { isRegisterState: false }, 
    },
    {
      path: '/register',
      name: 'Register',
      component: AuthView,
      meta: { isRegisterState: true }, 
    },
    {
      path: '/task',
      name: 'Task',
      component: TaskView,
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (next) => {
        const authStore = useAuthStore()
        authStore.logout()
        next({ name: 'Login' }) 
      },
    },
  ],
})

export default router
