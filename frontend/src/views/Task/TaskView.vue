<template>
  <div class="container mt-4">
    <h1>Task Details</h1>

    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="task">
      <p><strong>Title:</strong> {{ task.title }}</p>
      <p><strong>Description:</strong> {{ task.description }}</p>
    </div>

    <router-link to="/task" class="btn btn-secondary mt-3">Back to Tasks</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'

const route = useRoute()
const taskStore = useTaskStore()
const loading = ref(false)

const task = computed(() => taskStore.task)

onMounted(async () => {
  loading.value = true
  try {
    await taskStore.fetchTask(route.params.id)
  } finally {
    loading.value = false
  }
})
</script>
