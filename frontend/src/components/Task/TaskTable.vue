<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <TaskRow
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @action="(action, taskId) => emitAction(action, taskId)"
      />
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

const emit = defineEmits(['action'])

function emitAction(action, taskId) {
  emit('action', action, taskId)
}
// Debugging: Log the tasks passed to TaskTable
// onMounted(() => {
//   console.log('Tasks passed to TaskTable:', props.tasks);
// });
</script>
