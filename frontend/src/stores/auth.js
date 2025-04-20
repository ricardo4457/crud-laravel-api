import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import extractErrors from '@/helpers/extractErrors'

export const useAuthStore = defineStore('authStore', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  // Actions
  const login = async (formData) => {
    resetToken()
    try {
      const response = await axios.post('/api/login', formData)
      const responseData = response.data.data

      user.value = responseData.user
      token.value = responseData.token
      isAuthenticated.value = true

      setAuthToken() 
    } catch (error) {
      throw extractErrors(error)
    }
  }

  const register = async (formData) => {
    try {
      const response = await axios.post('/api/register', formData)
      const responseData = response.data.data

      user.value = responseData.user
      token.value = responseData.token
      isAuthenticated.value = true

      setAuthToken() 
    } catch (error) {
      throw extractErrors(error)
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false

    resetToken()
    
  }

  const resetToken = () => {
    token.value = null
    isAuthenticated.value = false

    delete axios.defaults.headers.common['Authorization']
  }

  const setAuthToken = () => {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout,
    resetToken,
    setAuthToken, 
  }
})
