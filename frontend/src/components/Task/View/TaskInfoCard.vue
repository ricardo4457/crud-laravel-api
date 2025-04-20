<template>
  <div class="mb-4">
    <h2 class="card-title">{{ title.value }}</h2>
    <p class="text-muted" v-if="id">ID: {{ id }}</p>
  </div>

  <div class="mb-4" v-if="description">
    <h5 class="fw-bold">Description</h5>
    <p class="card-text">{{ description || 'No description provided' }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  id: [String, Number],
  description: String
})
</script>
