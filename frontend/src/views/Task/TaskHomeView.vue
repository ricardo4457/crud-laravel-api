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

onMounted(() => {
  taskStore.fetchTasks().then(() => {
    console.log('Fetched Tasks:', taskStore.tasks);
  });
});

const searchQuery = ref('');

function handleSearch(query) {
  searchQuery.value = query;
  console.log('Search Query:', query);
}

const filteredTasks = computed(() => {
  if (!searchQuery.value) {
    return taskStore.tasks;
  }
});
</script>