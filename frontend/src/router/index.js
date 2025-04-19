import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import TaskHomeView from '../views/Task/TaskHomeView.vue'
import TaskFormView from '../views/Task/TaskFormView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: AuthView,
      meta: { isRegisterState: false, requiresAuth: false },
    },
    {
      path: '/register',
      name: 'Register',
      component: AuthView,
      meta: { isRegisterState: true, requiresAuth: false },
    },
    {
      path: '/task',
      name: 'Task',
      component: TaskHomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/task/new',
      component: TaskFormView,
    },
    { 
      path: '/task/edit/:id', 
      component: TaskFormView },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        authStore.logout()
        next({ name: 'Login' })
      },
      meta: { requiresAuth: true },
    },
  ],
})
// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
