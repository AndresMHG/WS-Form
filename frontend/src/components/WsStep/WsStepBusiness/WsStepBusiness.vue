<template>
    <div class="form-step">
      <div class="form-step__header">
        <span>Etapa <strong>2</strong> de 4 </span>
        <h2>Dados Empresariais</h2>
      </div>
      <div class="form-step__body">
        <form @submit.prevent="handleSubmit">
          <WsInputBase
            ref="companyNameInput"
            id="companyName"
            label="Razão Social"
            placeholder="Nome da Empresa"
            type="text"
            v-model="localForm.data.companyName"
            :required="true"
          />
          <WsInputBase
            ref="cnpjInput"
            id="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            type="text"
            v-model="localForm.data.cnpj"
            :required="true"
            :pattern="'\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}'"
            :mask="maskCNPJ"
            :maxlength="18"
          />
          <WsInputBase
            ref="companyOpeningDateInput"
            id="companyOpeningDate"
            label="Data de Abertura"
            type="date"
            v-model="localForm.data.companyOpeningDate"
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
  
  const companyNameInput = ref(null);
  const cnpjInput = ref(null);
  const companyOpeningDateInput = ref(null);
  const phoneInput = ref(null);
  
  const maskCNPJ = (value) => {
    return value
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea número
      .replace(/(\d{2})(\d)/, '$1.$2') // Aplica el primer punto
      .replace(/(\d{3})(\d)/, '$1.$2') // Aplica el segundo punto
      .replace(/(\d{3})(\d{4})(\d{2})$/, '$1/$2-$3'); // Aplica la barra y el guion
  };
  
  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea número
      .replace(/(\d{2})(\d)/, '($1) $2') // Aplica los paréntesis y el espacio
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Aplica el guion
  };
  
  const validateForm = () => {
    let isValid = true;
  
    // Validate company name input
    if (!companyNameInput.value.validate()) {
      isValid = false;
    }
  
    // Validate CNPJ input
    if (!cnpjInput.value.validate()) {
      isValid = false;
    }
  
    // Validate company opening date input
    if (!companyOpeningDateInput.value.validate()) {
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