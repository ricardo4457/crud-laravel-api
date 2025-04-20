<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">{{ isRegisterState ? 'Register' : 'Login' }}</h2>
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
            <div v-if="apiErrors.username" class="text-danger">{{ apiErrors.username[0] }}</div>
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
            <div v-if="apiErrors.password" class="text-danger">{{ apiErrors.password[0] }}</div>
          </div>
          <div v-if="isRegisterState" class="mb-3">
            <label for="passwordConfirmation" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              class="form-control"
              v-model="formData.passwordConfirmation"
              required
            />
            <div v-if="apiErrors.passwordConfirmation" class="text-danger">
              {{ apiErrors.passwordConfirmation[0] }}
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            {{ isRegisterState ? 'Register' : 'Login' }}
          </button>
        </form>
        <div class="text-center mt-3">
          <button class="btn btn-link" @click="toggleMode">
            {{
              isRegisterState ? 'Already have an account? Login' : "Don't have an account? Register"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const formData = reactive({
  username: '',
  password: '',
  passwordConfirmation: '',
})

const apiErrors = ref({})
const isRegisterState = ref(route.meta.isRegisterState)

const toggleMode = () => {
  isRegisterState.value = !isRegisterState.value
  apiErrors.value = {}

  if (isRegisterState.value) {
    router.push({ name: 'Register' })
  } else {
    router.push({ name: 'Login' })
  }
}

const handleSubmit = async () => {
  if (isRegisterState.value && formData.password !== formData.passwordConfirmation) {
    apiErrors.value = { passwordConfirmation: ['Passwords do not match.'] }
    return
  }

  try {
    if (isRegisterState.value) {
      // Register
      await authStore.register({
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      })
      router.push({ name: 'Login' })
    } else {
      // Login
      await authStore.login({
        username: formData.username,
        password: formData.password,
      })
      router.push({ name: 'Task' })
    }
  } catch (error) {
    apiErrors.value = error.errors
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
