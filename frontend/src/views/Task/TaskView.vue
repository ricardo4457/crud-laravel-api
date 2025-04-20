<template>
  <div class="container mt-4">
    <h1>Task Details</h1>
    <div v-if="task">
      <p><strong>Title:</strong> {{ task.title }}</p>
      <p><strong>Description:</strong> {{ task.description }}</p>
    </div>
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>
    <router-link to="/task" class="btn btn-secondary mt-3">Back to Tasks</router-link>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'

const route = useRoute()
const taskStore = useTaskStore()

const { task, error, fetchTask } = taskStore

onMounted(() => {
  fetchTask(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchTask(newId)
    }
  },
  { deep: true },
)
</script>
