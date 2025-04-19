<template>
  <div class="container mt-4">
    <h1>Task Management</h1>
    <SearchInput @search="handleSearch" />
    <TaskTable :tasks="filteredTasks" />
    <div class="mt-3">
      <router-link to="/task/new" class="btn btn-primary">Create New Task</router-link>
  </div>
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
  // for debugging purposes
  // taskStore.fetchTasks().then(() => {
  //   console.log('Fetched Tasks:', taskStore.tasks);
  // });
});

async function handleSearch(query) {
  searchQuery.value = query;
  // for debugging purposes
  // console.log('Search Query:', query);
  
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