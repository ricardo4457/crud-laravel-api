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
          v-model="formData.title"
          placeholder="Enter task title"
          required
          :disabled="isSubmitting"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          class="form-control"
          v-model="formData.description"
          placeholder="Enter task description"
          rows="4"
          required
          :disabled="isSubmitting"
        ></textarea>
      </div>
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isEditMode ? 'Update Task' : 'Create Task' }}
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm ms-2"></span>
        </button>
        <router-link to="/task" class="btn btn-outline-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const taskStore = useTaskStore()

const isSubmitting = ref(false)
const formData = ref({
  title: '',
  description: '',
})

onMounted(async () => {
  if (props.isEditMode && props.id) {
    try {
      await taskStore.fetchTask(props.id)
      if (taskStore.task) {
        formData.value = {
          title: taskStore.task.title,
          description: taskStore.task.description,
        }
      }
    } catch (error) {
      console.error('Error loading task:', error)
    }
  }
})

async function handleSubmit() {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    if (props.isEditMode && props.id) {
      await taskStore.updateTask(props.id, formData.value)
    } else {
      await taskStore.createTask(formData.value)
    }
    router.push({ name: 'Task' })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
