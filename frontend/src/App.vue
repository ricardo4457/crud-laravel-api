<script setup>
import Navbar from './components/Navigation/Navbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="d-flex flex-column vh-100">
    <header class="flex-shrink-0">
      <Navbar />
    </header>

    <main class="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
      <div class="container">
        <RouterView :key="$route.name" />
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  overflow-y: auto;
}
</style>
