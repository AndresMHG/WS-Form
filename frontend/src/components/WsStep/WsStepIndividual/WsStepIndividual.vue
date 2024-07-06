<template>
    <div class="form-step">
      <div class="form-step__header">
        <span>Etapa <span class="form-step__header--step-number">2</span> de 4</span>
        <h2>Dados Pessoais</h2>
      </div>
      <div class="form-step__body">
        <form @submit.prevent="handleSubmit">
          <WsInputBase
            ref="nameInput"
            id="name"
            label="Nome"
            type="text"
            v-model="localForm.name"
            :required="true"
          />
          <WsInputBase
            ref="cpfInput"
            id="cpf"
            label="CPF"
            type="text"
            v-model="localForm.cpf"
            :required="true"
            :pattern="'\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'"
          />
          <WsInputBase
            ref="birthdateInput"
            id="birthdate"
            label="Data de Nascimento"
            type="date"
            v-model="localForm.birthdate"
            :required="true"
          />
          <WsInputBase
            ref="phoneInput"
            id="phone"
            label="Número de Telefone"
            type="text"
            v-model="localForm.phone"
            :required="true"
            :pattern="'\\(\\d{2}\\) \\d{4,5}-\\d{4}'"
          />
          <div class="form-step__footer">
            <button class="form-step__footer--button-prev" type="button" @click="props.prev">Voltar</button>
            <button class="form-step__footer--button-next" type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import WsInputBase from '@/components/WsInputBase/WsInputBase.vue';
  
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
  
  const nameInput = ref(null);
  const cpfInput = ref(null);
  const birthdateInput = ref(null);
  const phoneInput = ref(null);
  
  const validateForm = () => {
    let isValid = true;
  
    // Validate name input
    if (!nameInput.value.validate()) {
      isValid = false;
    }
  
    // Validate CPF input
    if (!cpfInput.value.validate()) {
      isValid = false;
    }
  
    // Validate birthdate input
    if (!birthdateInput.value.validate()) {
      isValid = false;
    }
  
    // Validate phone input
    if (!phoneInput.value.validate()) {
      isValid = false;
    }
  
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      emit('update:form', localForm.value);
      props.next();
    }
  };
  </script>