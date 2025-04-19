<template>
  <div>
    <table v-if="tasks.length > 0" class="table table-striped" >
      <thead>
        <tr>
          <th>Title</th>
          <th class="text-start">Actions</th>
        </tr>
      </thead>
      <tbody>
        <TaskRow v-for="task in paginatedTasks" :key="task.id" :task="task" />
      </tbody>
    </table>
    <p v-else class="text-muted">No tasks found</p>
    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">&laquo;</button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">&raquo;</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskRow from './TaskRow.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const itemsPerPage = 10
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.tasks.length / itemsPerPage))

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.tasks.slice(start, end)
})

const goToPage = (page) => {
  currentPage.value = page
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

</script>

<style scoped>
.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
