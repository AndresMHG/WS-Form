<template>
    <div>
      <h2>Review Your Information</h2>
      <div>
        <label>Email:</label>
        <span>{{ localForm.email }}</span>
      </div>
      <div v-if="localForm.type === 'individual'">
        <div>
          <label>Name:</label>
          <span>{{ localForm.data.name }}</span>
        </div>
        <div>
          <label>CPF:</label>
          <span>{{ localForm.data.cpf }}</span>
        </div>
        <div>
          <label>Birthdate:</label>
          <span>{{ localForm.data.birthdate }}</span>
        </div>
        <div>
          <label>Phone:</label>
          <span>{{ localForm.data.phone }}</span>
        </div>
      </div>
      <div v-else>
        <div>
          <label>Company Name:</label>
          <span>{{ localForm.data.companyName }}</span>
        </div>
        <div>
          <label>CNPJ:</label>
          <span>{{ localForm.data.cnpj }}</span>
        </div>
        <div>
          <label>Opening Date:</label>
          <span>{{ localForm.data.companyOpeningDate }}</span>
        </div>
        <div>
          <label>Phone:</label>
          <span>{{ localForm.data.phone }}</span>
        </div>
      </div>
      <div>
        <label>Password:</label>
        <span>{{ localForm.password }}</span>
      </div>
      <button type="button" @click="props.prev">Back</button>
      <button @click="handleSubmit">Submit</button>
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
    // Aquí podrías hacer la lógica para enviar el formulario
    console.log('Form submitted:', localForm.value);
    props.next();
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  