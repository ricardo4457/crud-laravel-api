<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">Tasks</RouterLink>
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
        <ul class="navbar-nav ms-auto">
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

const authStore = useAuthStore()

// Store properties 
const isAuthenticated = computed(() => authStore.isAuthenticated)

const filteredRoutes = computed(() => {
  const baseRoutes = router.options.routes.filter((route) =>
    ['Register', 'Login'].includes(route.name),
  )

  // Check if the user is authenticated add tasks route to the navbar
  if (isAuthenticated) {
    baseRoutes.push(router.options.routes.find((route) => route.name === 'Task' ))
  }

  return baseRoutes
})
</script>
