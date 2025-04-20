<template>
  <div>
    <TaskFilters @sort-change="handleSortChange" />

    <table v-if="sortedTasks.length > 0" class="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th class="text-start">Created At</th>
          <th class="text-start">Updated At</th>
          <th class="text-start">Actions</th>
        </tr>
      </thead>
      <tbody>
        <TaskRow
          v-for="task in paginatedTasks"
          :key="task.id"
          :task="task"
          @action-delete="handleActionDelete"
        />
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
import TaskFilters from './TaskFilters.vue'

const emit = defineEmits(['action-delete'])
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const itemsPerPage = 10
const currentPage = ref(1)
const sortDirection = ref('newest')

const sortedTasks = computed(() => {
  const tasksCopy = [...props.tasks]
  if (sortDirection.value === 'oldest') {
    // Debugging
    // console.log('oldest')
    return tasksCopy.sort(
      (a, b) => new Date(a.timestamp.created_at) - new Date(b.timestamp.updated_at),
    )
  } else {
    // Debugging
    // console.log('newest')
    return tasksCopy.sort(
      (a, b) => new Date(b.timestamp.created_at) - new Date(a.timestamp.created_at),
    )
  }
})

const totalPages = computed(() => Math.ceil(sortedTasks.value.length / itemsPerPage))

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedTasks.value.slice(start, end)
})

const handleSortChange = (direction) => {
  sortDirection.value = direction
  currentPage.value = 1
}

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

const handleActionDelete = (action) => {
  emit('action-delete', action)
}
</script>

<style scoped>
.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
