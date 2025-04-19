<template>
  <div class="d-flex gap-2">
    <button
      v-for="(action, index) in actions"
      :key="index"
      :class="['btn', `btn-outline-${action.type}`, 'btn-sm']"
      @click.prevent="emitAction(action)"
    >
      <i :class="action.icon"></i> {{ action.label }}
    </button>
  </div>
</template>

<script setup>

defineProps({
  actions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(['action-click']);

function emitAction(action) {
  emit('action-click', action);
}
</script>