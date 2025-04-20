<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
    <div class="container-fluid">
      <span class="navbar-brand">Tasks</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto" :key="authStore.isAuthenticated">
          <li class="nav-item" v-for="route in filteredRoutes" :key="route.name">
            <RouterLink :to="route.path" class="nav-link">{{ route.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const AUTHENTICATED_ROUTES = ['Task', 'Logout']
const PUBLIC_ROUTES = ['Register', 'Login']

const authStore = useAuthStore()

const filteredRoutes = computed(() => {
  if (authStore.isAuthenticated) {
    return router.options.routes.filter((route) => AUTHENTICATED_ROUTES.includes(route.name))
  }
  return router.options.routes.filter((route) => PUBLIC_ROUTES.includes(route.name))
})
</script>
