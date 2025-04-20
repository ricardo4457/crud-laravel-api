<template>
  <div class="container mt-4">
    <h1>Task Management</h1>

    <TaskLoading v-if="isInitialLoading" />

    <template v-else>
      <SearchInput @search="handleSearch" :disabled="isRefreshing" />

      <div v-if="isRefreshing" class="text-center my-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <TaskTable
        v-else
        :tasks="filteredTasks"
        @action-delete="handleActionDelete"
        :loading="isActionProcessing"
      />

      <div class="mt-3">
        <router-link
          to="/task/new"
          class="btn btn-primary"
          :disabled="isRefreshing || isActionProcessing"
        >
          Create New Task
        </router-link>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import TaskTable from '@/components/Task/Table/TaskTable.vue'
import TaskLoading from '@/components/Task/TaskLoading.vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const searchQuery = ref('')
const isRefreshing = ref(false)
const isInitialLoading = ref(true)
const isActionProcessing = ref(false)

onMounted(() => {
  refreshTasks()
})

async function refreshTasks() {
  try {
    if (searchQuery.value.trim()) {
      await taskStore.searchTasks(searchQuery.value)
    } else {
      await taskStore.fetchTasks()
    }
  } finally {
    isRefreshing.value = false
    isInitialLoading.value = false
  }
}

async function handleSearch(query) {
  searchQuery.value = query
  isRefreshing.value = true
  await refreshTasks()
}

async function handleActionDelete() {
  isActionProcessing.value = true
  try {
    await refreshTasks()
  } finally {
    setTimeout(() => {
      isActionProcessing.value = false
    }, 300)
  }
}

const filteredTasks = computed(() => {
  return taskStore.tasks
})
</script>
