<script setup>
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';

import WsHeader from '@/components/WsHeader/WsHeader.vue';
import WsStep from '@/components/WsStep/WsStep.vue'
import WsNotification from '@/components/WsNotification/WsNotification.vue'
import WsLoading from '@/components/WsLoading/WsLoading.vue'

const { apiFetch } = useApi();

const response = ref(null)
const isLoading = ref(true);
const error = ref(null);

const fetchRegistrations = async () => {
  try {
    setTimeout(async () => {
      const res = await apiFetch('/registration', {
        method: 'GET',
      });
      response.value = res.status;
      isLoading.value = false;
    }, 1500); // Timeout de 2 segundos
  } catch (err) {
    error.value = err
    isLoading.value = false;
  }
};

const isReady = computed(()=>{
  return response.value === 'success' ? true : false
})

onMounted(()=> fetchRegistrations() )

</script>

<template>
  <WsHeader />
  <main>
    <WsLoading v-if="isLoading" />
    <div v-if="isReady">
      <WsNotification />
      <WsStep />
    </div>
  </main>
</template>