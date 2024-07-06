<script setup>
import { ref, onMounted } from 'vue';
import { useApi } from '@/composables/useApi';

import WsHeader from '@/components/WsHeader/WsHeader.vue';
import WsStep from '@/components/WsStep/WsStep.vue'

const { apiFetch } = useApi();

const registrations = ref();
const fetchRegistrations = async () => {
  try {
    registrations.value = await apiFetch('/registration',{
      method: 'GET',
    });
  } catch (err) {
    console.error('Error fetching registrations:', err);
  }
};
onMounted(()=> fetchRegistrations() )

</script>

<template>
  <WsHeader />
  <main>
    <WsStep />
  </main>
</template>