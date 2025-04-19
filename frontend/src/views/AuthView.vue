<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">{{ isRegisterMode ? 'Register' : 'Login' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="formData.username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="formData.password"
              required
            />
          </div>
          <div v-if="isRegisterMode" class="mb-3">
            <label for="passwordConfirmation" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              class="form-control"
              v-model="formData.passwordConfirmation"
              required
            />
          </div>
          <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-primary w-100">
            {{ isRegisterMode ? 'Register' : 'Login' }}
          </button>
        </form>
        <div class="text-center mt-3">
          <button class="btn btn-link" @click="toggleMode">
            {{ isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// Form data
const formData = reactive({
  username: '',
  password: '',
  passwordConfirmation: '',
})


const errorMessage = ref('')

const isRegisterMode = ref(false)

const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value
  errorMessage.value = '' 
}

// Handle form submission
const handleSubmit = async () => {
  if (isRegisterMode.value && formData.password !== formData.passwordConfirmation) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {

    if (isRegisterMode.value) {
      // Register 
      await authStore.register({
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      })
      router.push({ name: 'login' }) // Redirect to login after registration
    } else {
      // Login 

    }
  } catch (error) {
    errorMessage.value = isRegisterMode.value
      ? 'Registration failed. Please try again.'
      : 'Login failed. Please check your credentials.'
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
