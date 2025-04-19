<template>
  <div class="container mt-4">
    <h1>Task Management</h1>
    <SearchInput @search="handleSearch" />
    <TaskTable :tasks="filteredTasks" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import TaskTable from '@/components/Task/TaskTable.vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const searchQuery = ref('');

onMounted(() => {
  taskStore.fetchTasks().then(() => {
    console.log('Fetched Tasks:', taskStore.tasks);
  });
});

async function handleSearch(query) {
  searchQuery.value = query;
  console.log('Search Query:', query);
  
  if (query.trim()) {
    await taskStore.searchTasks(query);
  } else {
    await taskStore.fetchTasks();
  }
}

const filteredTasks = computed(() => {
  return taskStore.tasks;
});
</script>