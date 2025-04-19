import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/Auth/RegisterView.vue' 
import LoginView from '../views/Auth/LoginView.vue'
import TaskView from '../views/TaskHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView
    },
  ],
})

export default router
