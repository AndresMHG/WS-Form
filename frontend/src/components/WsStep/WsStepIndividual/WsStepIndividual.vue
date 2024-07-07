<template>
    <div class="form-step">
      <div class="form-step__header">
        <span>Etapa <strong>2</strong> de 4 </span>
        <h2>Dados Pessoais</h2>
      </div>
      <div class="form-step__body">
        <form @submit.prevent="handleSubmit">
          <WsInputBase
            ref="nameInput"
            id="name"
            label="Nome"
            placeholder="Nome"
            type="text"
            v-model="localForm.data.name"
            :required="true"
          />
          <WsInputBase
            ref="cpfInput"
            id="cpf"
            label="CPF"
            placeholder="000-000-000-00"
            type="text"
            v-model="localForm.data.cpf"
            :required="true"
            :pattern="'\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'"
            :mask="maskCPF"
            :maxlength="14"
          />
          <WsInputBase
            ref="birthdateInput"
            id="birthdate"
            label="Data de Nascimento"
            type="date"
            v-model="localForm.data.birthdate"
            :required="true"
          />
          <WsInputBase
            ref="phoneInput"
            id="phone"
            label="Número de Telefone"
            type="text"
            placeholder="(99) 99999-9999"
            v-model="localForm.data.phone"
            :required="true"
            :pattern="'\\(\\d{2}\\) \\d{4,5}-\\d{4}'"
            :mask="maskPhone"
            :maxlength="15"
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
  import { useNotification } from '@/composables/useNotification';
  const { addNotification } = useNotification();
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
  
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea número
      .replace(/(\d{3})(\d)/, '$1.$2') // Aplica el primer punto
      .replace(/(\d{3})(\d)/, '$1.$2') // Aplica el segundo punto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Aplica el guion
  };
  
  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea número
      .replace(/(\d{2})(\d)/, '($1) $2') // Aplica los paréntesis y el espacio
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Aplica el guion
  };
  
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
    if(!isValid) addNotification('warning', 'Todos os campos são obrigatórios')
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      emit('update:form', localForm.value);
      props.next();
    }
  };
  </script>
  
