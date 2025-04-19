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
        v-for="task in props.tasks"
        :key="task.id"
        :task="task"
        @view-task="viewTask"
        @edit-task="editTask"
        @delete-task="deleteTask"
      />
    </tbody>
  </table>
</template>

<script setup>
import TaskRow from './TaskRow.vue';

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

function viewTask(task) {
  console.log('Viewing task:', task);
}

function editTask(task) {
  console.log('Editing task:', task);

}

function deleteTask(task) {
  console.log('Deleting task:', task);
}
</script>
