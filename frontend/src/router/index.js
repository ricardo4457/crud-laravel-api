import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import TaskHomeView from '../views/Task/TaskHomeView.vue'
import TaskFormView from '../views/Task/TaskFormView.vue'
import TaskView from '../views/Task/TaskView.vue'

import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/task'

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
      name: 'TaskCreate',
      component: TaskFormView,
      props: (route) => ({ isEditMode: false }),
    },
    {
      path: '/task/edit/:id',
      name: 'TaskEdit',
      component: TaskFormView,
      props: (route) => ({ isEditMode: true, id: route.params.id }),
    },
    {
      path: '/task/:id',
      name: 'TaskView',
      component: TaskView,
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: '/task/delete/:id',
      name: 'TaskDelete',
      beforeEnter: async (to, from, next) => {
        try {
          const taskStore = useTaskStore()
          await taskStore.deleteTask(to.params.id)
          next({ name: 'Task' })
        } catch (error) {
          console.error('Delete failed:', error)
          next(false)
        }
      },
      meta: { requiresAuth: true },
    },
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
