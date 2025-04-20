<template>
  <div class="d-flex gap-2">
    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
      {{ isEditMode ? 'Update Task' : 'Create Task' }}
      <span v-if="isSubmitting" class="spinner-border spinner-border-sm ms-2"></span>
    </button>
    <router-link to="/task" class="btn btn-outline-secondary">Cancel</router-link>
  </div>
</template>

<script setup>
defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
})
</script>
