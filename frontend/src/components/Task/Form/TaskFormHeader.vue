<template>
  <h1>{{ isEditMode ? 'Edit Task' : 'Create New Task' }}</h1>
</template>

<script setup>
defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
})
</script>
