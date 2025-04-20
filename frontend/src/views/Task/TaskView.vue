<template>
  <div class="container mt-4">
    <TaskHeader />
    
    <TaskLoading v-if="loading" />
    
    <div v-else-if="task" class="card">
      <div class="card-body">
        <TaskInfoCard 
          :title="task.title"
          :id="task.id"
          :description="task.description"
        />
        
        <div class="row">
          <div class="col-md-6 mb-3">
            <DataCard title="Timestamps">
              <DataItem label="Created" :value="formatDate(task.timestamp.created_at)" />
              <DataItem label="Updated" :value="formatDate(task.timestamp.updated_at)" />
            </DataCard>
          </div>
          
          <div class="col-md-6 mb-3">
            <DataCard title="User Information">
              <DataItem label="User ID" :value="task.relationship.user_id" />
              <DataItem label="Username" :value="task.relationship.username" />
            </DataCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import TaskHeader from '@/components/Task/View/TaskHeader.vue'
import TaskLoading from '@/components/Task/TaskLoading.vue'
import TaskInfoCard from '@/components/Task/View/TaskInfoCard.vue'
import DataCard from '@/components/Task/View/DataCard.vue'
import DataItem from '@/components/Task/View/DataItem.vue'

const route = useRoute()
const taskStore = useTaskStore()
const loading = ref(false)

const task = computed(() => taskStore.task)

onMounted(async () => {
  loading.value = true
  try {
    await taskStore.fetchTask(route.params.id)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>