<template>
   <div class="mb-3">
     <label :for="id" class="form-label">{{ label }}</label>
     <component
       :is="multiline ? 'textarea' : 'input'"
       :id="id"
       class="form-control"
       :value="modelValue"
       @input="$emit('update:modelValue', $event.target.value)"
       :placeholder="placeholder"
       :required="required"
       :disabled="disabled"
       :rows="multiline ? 4 : null"
       :type="multiline ? null : 'text'"
     />
   </div>
 </template>
 
 <script setup>
 defineProps({
   id: String,
   label: String,
   modelValue: [String, Number],
   placeholder: String,
   required: {
     type: Boolean,
     default: false
   },
   disabled: {
     type: Boolean,
     default: false
   },
   multiline: {
     type: Boolean,
     default: false
   }
 })
 
 defineEmits(['update:modelValue'])
 </script>