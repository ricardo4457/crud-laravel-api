<template>
  <tr>
    <td>{{ task.title }}</td>
    <td>
      <ActionMenu :actions="actions" @action-click="handleAction" />
    </td>
  </tr>
</template>

<script setup>
import ActionMenu from '@/components/ActionMenu.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['action-delete'])

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

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
]

function handleAction(action) {
  if (action.action === 'view') {
    router.push({ name: 'TaskView', params: { id: props.task.id } })
  } else if (action.action === 'edit') {
    router.push({ name: 'TaskEdit', params: { id: props.task.id } })
  } else if (action.action === 'delete') {
    router.push({ name: 'TaskDelete', params: { id: props.task.id } })
    emit('action-delete', action)
  }
}
</script>
