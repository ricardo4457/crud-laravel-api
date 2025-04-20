<template>
  <div class="container mt-4">
    <h1>Task Management</h1>
    <SearchInput @search="handleSearch" />
    <TaskTable :tasks="filteredTasks" @action-delete="handleActionDelete" />
    <div class="mt-3">
      <router-link to="/task/new" class="btn btn-primary">Create New Task</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import TaskTable from '@/components/Task/Table/TaskTable.vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const searchQuery = ref('')
const isRefreshing = ref(false)

onMounted(() => {
  refreshTasks()
})


async function refreshTasks() {
  isRefreshing.value = true
  try {
    if (searchQuery.value.trim()) {
      await taskStore.searchTasks(searchQuery.value)
    } else {
      await taskStore.fetchTasks()
    }
  } finally {
    isRefreshing.value = false
  }
}

async function handleSearch(query) {
  searchQuery.value = query
  await refreshTasks()
}


const handleActionDelete = () => {
  refreshTasks()
}

const filteredTasks = computed(() => {
  return taskStore.tasks
})
</script>
