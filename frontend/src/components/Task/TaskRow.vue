<template>
  <tr>
    <td>{{ task.title }}</td>
    <td>
      <ActionMenu />
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

</script>