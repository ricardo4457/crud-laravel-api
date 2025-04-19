<template>
  <div class="container mt-4">
    <h1>Task Management</h1>
    <SearchInput @search="handleSearch" />
    <TaskTable :tasks="filteredTasks" @action="handleAction" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import TaskTable from '@/components/Task/TaskTable.vue';

const tasks = ref([
  { id: 1, title: 'Task 1', description: 'Description 1' },
  { id: 2, title: 'Task 2', description: 'Description 2' },
  { id: 3, title: 'Task 3', description: 'Description 3' },
]);

const searchQuery = ref('');
const filteredTasks = computed(() =>
  tasks.value.filter(task =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function handleSearch(query) {
  searchQuery.value = query;
}

function handleAction(action, taskId) {
  console.log(`Action: ${action}, Task ID: ${taskId}`);
}
</script>