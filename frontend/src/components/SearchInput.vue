<template>
  <div class="mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Search tasks..."
      v-model="query"
      @input="emitSearch"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');

function emitSearch() {
  emit('search', query.value);
}
</script>