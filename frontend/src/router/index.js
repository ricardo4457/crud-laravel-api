import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue' 

import TaskView from '../views/TaskHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: AuthView
    },
    {
      path: '/register',
      name: 'Register',
      component: AuthView
    },
    {
      path: '/task',
      name: 'Task',
      component: TaskView
    },
  ],
})

export default router
