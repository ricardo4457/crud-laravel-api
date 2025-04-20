<template>
  <div class="container mt-4">
    <TaskFormHeader :is-edit-mode="isEditMode" />

    <TaskLoading v-if="loadingTask" />

    <template v-else>
      <form @submit.prevent="handleSubmit">
        <TaskFormInput
          id="title"
          label="Title"
          v-model="formData.title"
          placeholder="Enter task title"
          :required="true"
          :disabled="isSubmitting"
        />

        <TaskFormInput
          id="description"
          label="Description"
          v-model="formData.description"
          placeholder="Enter task description"
          :required="true"
          :disabled="isSubmitting"
          :multiline="true"
        />

        <TaskFormActions :is-edit-mode="isEditMode" :is-submitting="isSubmitting" />
      </form>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import TaskLoading from '@/components/Task/TaskLoading.vue'
import TaskFormHeader from '@/components/Task/Form/TaskFormHeader.vue'
import TaskFormInput from '@/components/Task/Form/TaskFormInput.vue'
import TaskFormActions from '@/components/Task/Form/TaskFormActions.vue'

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
const loadingTask = ref(false)
const formData = ref({
  title: '',
  description: '',
})

onMounted(async () => {
  if (props.isEditMode && props.id) {
    loadingTask.value = true
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
    } finally {
      loadingTask.value = false
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
