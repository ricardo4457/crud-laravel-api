<template>
  <tr>
    <td>{{ task.title }}</td>
    <td>
      <ActionMenu @action="(action) => emitAction(action, task.id)" />
    </td>
  </tr>
</template>

<script setup>
import ActionMenu from '@/components/ActionMenu.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['action'])

function emitAction(action, taskId) {
  emit('action', action, taskId)
}
</script>