<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <TaskRow v-for="task in props.tasks" :key="task.id" :task="task" />
    </tbody>
  </table>
</template>

<script setup>
import TaskRow from './TaskRow.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})
</script>
