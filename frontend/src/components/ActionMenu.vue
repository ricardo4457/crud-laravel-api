<template>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-primary btn-sm" @click.prevent="emitAction('edit')">
      <i class="mdi mdi-pencil"></i> Edit
    </button>
    <button class="btn btn-outline-danger btn-sm" @click.prevent="emitAction('delete')">
      <i class="mdi mdi-trash-can"></i> Delete
    </button>
    <button class="btn btn-outline-secondary btn-sm" @click.prevent="emitAction('view')">
      <i class="mdi mdi-eye"></i> View
    </button>
  </div>
  <link
  href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css"
  rel="stylesheet"
/>
</template>

<script setup>
const emit = defineEmits(['action']);

function emitAction(action) {
  emit('action', action);
}
</script>