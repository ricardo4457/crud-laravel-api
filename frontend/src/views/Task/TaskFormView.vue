<template>
  <div class="container mt-4">
    <h1>{{ isEditMode ? 'Edit Task' : 'Create New Task' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          id="title"
          class="form-control"
          v-model="task.title"
          placeholder="Enter task title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          class="form-control"
          v-model="task.description"
          placeholder="Enter task description"
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEditMode ? 'Update Task' : 'Create Task' }}
      </button>
      <router-link to="/task" class="btn btn-secondary ms-2">Cancel</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isEditMode = ref(false)

function handleSubmit() {
  if (isEditMode.value) {
    console.log('Updating task:', task.value)
    router.push('/task')
  } else {
    console.log('Creating new task:', task.value)
    router.push('/task')
  }
  router.push('/task')
}
</script>
