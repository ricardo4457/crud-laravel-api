import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/Auth/RegisterView.vue' 
import LoginView from '../views/Auth/LoginView.vue'
import TaskView from '../views/TaskHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/task',
      name: 'Task',
      component: TaskView
    },
  ],
})

export default router
