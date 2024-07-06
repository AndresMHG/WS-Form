<template>
    <div>
      <h2>Business Information</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="companyName">Company Name</label>
          <input type="text" id="companyName" v-model="localForm.data.companyName" required />
        </div>
        <div>
          <label for="cnpj">CNPJ</label>
          <input type="text" id="cnpj" v-model="localForm.data.cnpj" required />
        </div>
        <div>
          <label for="companyOpeningDate">Opening Date</label>
          <input type="date" id="companyOpeningDate" v-model="localForm.data.companyOpeningDate" required />
        </div>
        <div>
          <label for="phone">Phone</label>
          <input type="tel" id="phone" v-model="localForm.data.phone" required />
        </div>
        <button type="button" @click="props.prev">Back</button>
        <button type="submit">Next</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  
  const props = defineProps({
    next: {
      type: Function,
      required: true
    },
    prev: {
      type: Function,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['update:form']);
  
  const localForm = ref({ ...props.form });
  
  watch(localForm, (newForm) => {
    emit('update:form', newForm);
  }, { deep: true });
  
  const handleSubmit = () => {
    props.next();
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  