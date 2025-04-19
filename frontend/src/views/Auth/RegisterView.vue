<template>
   <div class="container mt-5">
      <div class="row justify-content-center">
         <div class="col-md-6">
            <h2 class="text-center mb-4">Register</h2>
            <form @submit.prevent="console.log(formData)">
               <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                     type="text"
                     id="username"
                     class="form-control"
                     v-model="formData.username"
                     required
                  />
               </div>
               <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                     type="password"
                     id="password"
                     class="form-control"
                     v-model="formData.password"
                     required
                  />
               </div>
               <div class="mb-3">
                  <label for="passwordConfirmation" class="form-label">Confirm Password</label>
                  <input
                     type="password"
                     id="passwordConfirmation"
                     class="form-control"
                     v-model="formData.passwordConfirmation"
                     required
                  />
               </div>
               <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
         </div>
      </div>
   </div>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({
   username: "",
   password: "",
   passwordConfirmation: "",
});


</script>
<!-- styles -->
<style scoped>
.container {
   max-width: 500px;
}
</style>
