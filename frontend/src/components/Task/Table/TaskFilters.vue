<template>
  <div class="d-flex align-items-center mb-3 gap-2">
    <div class="input-group" style="width: 200px">
      <label class="input-group-text" for="sortOrder">Sort by</label>
      <select id="sortOrder" class="form-select" v-model="sortOrder" @change="emitSortChange">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['sort-change'])

const sortOrder = ref('newest')

const emitSortChange = () => {
  emit('sort-change', sortOrder.value)
}
</script>

<style scoped>
.input-group-text {
  min-width: 70px;
}
</style>
