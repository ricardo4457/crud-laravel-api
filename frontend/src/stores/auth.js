import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  // Actions
  const register = async (formData) => {
    try {
      const response = await axios.post('/api/register', formData)
      const responseData = response.data.data

      user.value = responseData.user
      token.value = responseData.token
      isAuthenticated.value = true

      localStorage.setItem('authToken', token.value)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    register,
  }
})
