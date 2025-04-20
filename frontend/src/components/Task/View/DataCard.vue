<template>
  <div class="card">
    <div class="card-header bg-light">
      <h6 class="mb-0">{{ title }}</h6>
    </div>
    <div class="card-body">
      <ul class="list-unstyled mb-0">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>
