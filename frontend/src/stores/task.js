import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import extractErrors from '@/helpers/extractErrors'

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref([])
  const task = ref(null)
  const error = ref(null)

  // Actions
  const fetchTasks = async () => {
    const authStore = useAuthStore()
    authStore.setAuthToken()
    error.value = null
    try {
      const response = await axios.get('/api/tasks')
      tasks.value = response.data.data
    } catch (err) {
      error.value = extractErrors(err)
    }
  }

  const fetchTask = async (id) => {
    const authStore = useAuthStore()
    authStore.setAuthToken()
    error.value = null
    try {
      const response = await axios.get(`/api/tasks/${id}`)
      task.value = response.data.data
    } catch (err) {
      error.value = extractErrors(err)
    }
  }

  const createTask = async (taskData) => {
    const authStore = useAuthStore()
    authStore.setAuthToken()
    error.value = null
    try {
      const response = await axios.post('/api/tasks', taskData)
      tasks.value.push(response.data.data)
    } catch (err) {
      error.value = extractErrors(err)
    }
  }

  const updateTask = async (id, taskData) => {
    const authStore = useAuthStore()
    authStore.setAuthToken()
    error.value = null
    try {
      const response = await axios.put(`/api/tasks/${id}`, taskData)
      const index = tasks.value.findIndex((task) => task.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data.data
      }
    } catch (err) {
      error.value = extractErrors(err)
    }
  }

  const deleteTask = async (id) => {
    const authStore = useAuthStore()
    authStore.setAuthToken()
    error.value = null
    try {
      await axios.delete(`/api/tasks/${id}`)
      tasks.value = tasks.value.filter((task) => task.id !== id)
    } catch (err) {
      error.value = extractErrors(err)
    }
  }

  const searchTasks = async (query) => {
    const authStore = useAuthStore()
    authStore.setAuthToken()
    error.value = null
    try {
      const response = await axios.post('/api/tasks/search', { query })
      tasks.value = response.data.data
    } catch (err) {
      error.value = extractErrors(err)
    }
  }
  return {
    tasks,
    task,
    error,
    fetchTasks,
    fetchTask,
    searchTasks,
    createTask,
    updateTask,
    deleteTask,
  }
})
