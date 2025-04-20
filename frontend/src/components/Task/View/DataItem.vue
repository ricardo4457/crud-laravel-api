<template>
  <li class="mb-2">
    <strong>{{ label }}:</strong> {{ value }}
  </li>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number, Date],
})
</script>
