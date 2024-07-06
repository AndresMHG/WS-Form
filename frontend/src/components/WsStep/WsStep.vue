<script setup>
import { ref, computed, markRaw } from 'vue';
import WsWelcome from '@/components/WsStep/WsStepWelcome/WsStepWelcome.vue'
import WsStepIndividual from '@/components/WsStep/WsStepIndividual/WsStepIndividual.vue'
import WsStepBusiness from '@/components/WsStep/WsStepBusiness/WsStepBusiness.vue'
import WsStepPassword from '@/components/WsStep/WsStepPassword/WsStepPassword.vue'
import WsStepReview from '@/components/WsStep/WsStepReview/WsStepReview.vue'

const form = ref({
  email: '',
  type: '', // 'individual' or 'business'
  data: {
    name: '',
    cpf: '',
    birthdate: '',
    phone: '',
    companyName: '',
    cnpj: '',
    companyOpeningDate: ''
  },
  password: ''
});

const RawWsStepWelcome = markRaw(WsWelcome);
const RawWsStepIndividual = markRaw(WsStepIndividual);
const RawWsStepBusiness = markRaw(WsStepBusiness);
const RawWsStepPassword = markRaw(WsStepPassword);
const RawWsStepReview = markRaw(WsStepReview);

const IndividualOrBusiness = computed(()=>{
    return form.value.type === 'business' ? RawWsStepBusiness : RawWsStepIndividual;
})

const steps = ref([
  RawWsStepWelcome,
  IndividualOrBusiness,
  RawWsStepPassword,
  RawWsStepReview
]);

const currentStep = ref(1);

const currentStepComponent = computed(() => {
  const step = steps.value[currentStep.value - 1];
  // Resolve the computed step component
  return step && step.value ? step.value : step;
});

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const updateForm = (newForm) => {
  form.value = newForm;
};

</script>

<template>
  <div class="step-container">
    <component :is="currentStepComponent" :prev="prevStep" :next="nextStep" :form="form"  @update:form="updateForm"/> 
  </div>
</template>
