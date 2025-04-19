<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>
          <ActionMenu @action="action => emitAction(action, task.id)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ActionMenu from '@/components/ActionMenu.vue';

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['action']);

function emitAction(action, taskId) {
  emit('action', action, taskId);
}
</script>