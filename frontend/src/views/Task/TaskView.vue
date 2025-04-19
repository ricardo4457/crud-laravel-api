<template>
   <div class="container mt-4">
     <h1>Task Details</h1>
     <div v-if="task">
       <p><strong>Title:</strong> {{ task.title }}</p>
       <p><strong>Description:</strong> {{ task.description }}</p>
     </div>
     <div v-else>
       <p>Loading task details...</p>
     </div>
     <router-link to="/task" class="btn btn-secondary mt-3">Back to Tasks</router-link>
   </div>
 </template>
 
 <script setup>

 const props = defineProps({
   task: {
     type: Object,
     required: true,
   },
 });
 
 </script>