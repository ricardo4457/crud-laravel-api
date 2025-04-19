import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from './auth';
import extractErrors from '@/helpers/extractErrors';

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref([]);
  const task = ref(null);
  const error = ref(null);

  // Actions
  const fetchTasks = async () => {
    const authStore = useAuthStore();
    authStore.setAuthToken();
    error.value = null;
    try {
      const response = await axios.get('/api/tasks');
      tasks.value = response.data.data;
    } catch (err) {
      error.value = extractErrors(err) || 'Failed to fetch tasks.';
    }
  };

  const fetchTask = async (id) => {
    const authStore = useAuthStore();
    authStore.setAuthToken();
    error.value = null;
    try {
      const response = await axios.get(`/api/tasks/${id}`);
      task.value = response.data.data;
    } catch (err) {
      error.value = extractErrors(err) || 'Failed to fetch the task.';
    }
  };
  
  const searchTasks = async (query) => {
    const authStore = useAuthStore();
    authStore.setAuthToken();
    error.value = null;
    try {
      const response = await axios.post('/api/tasks/search', { query });
      tasks.value = response.data.data;
    } catch (err) {
      error.value = extractErrors(err) || 'Failed to search tasks.';
    }
  };
  return {
    tasks,
    task,
    error,
    fetchTasks,
    fetchTask,
    searchTasks,
  };
});