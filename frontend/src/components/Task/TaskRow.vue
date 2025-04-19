<template>
  <tr>
    <td>{{ props.task.title }}</td>
    <td>
      <ActionMenu :actions="actions" @action-click="handleAction" />
    </td>
  </tr>
</template>

<script setup>
import ActionMenu from '@/components/ActionMenu.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit-task', 'delete-task', 'view-task']);

const actions = [
  {
    label: 'View',
    icon: 'mdi mdi-eye', 
    type: 'info',
    action: 'view',
  },
  {
    label: 'Edit',
    icon: 'mdi mdi-pencil', 
    type: 'primary',
    action: 'edit',
  },
  {
    label: 'Delete',
    icon: 'mdi mdi-delete', 
    type: 'danger',
    action: 'delete',
  },
];

function handleAction(action) {
  if (action.action === 'view') {
    emit('view-task', props.task);
  } else if (action.action === 'edit') {
    emit('edit-task', props.task);
  } else if (action.action === 'delete') {
    emit('delete-task', props.task);
  }
}
</script>