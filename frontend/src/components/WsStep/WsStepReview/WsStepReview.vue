<template>
    <div class="form-step">
      <div class="form-step__header">
        <span>Etapa <span class="form-step__header--step-number">4</span> de 4</span>
        <h2>Revisão dos Dados</h2>
      </div>
      <div class="form-step__body">
        <form @submit.prevent="handleSubmit">
            <WsInputBase
            v-if="localForm.type === 'individual'"
            ref="nameInput"
            id="name"
            label="Nome"
            type="text"
            v-model="localForm.data.name"
            :required="true"
          />
          <WsInputBase
            v-if="localForm.type === 'business'"
            label="Nome da Empresa"
            placeholder="Nome da Empresa"
            ref="nameInput"
            id="name"
            type="text"
            v-model="localForm.data.companyName"
            :required="true"
          />
          <WsInputBase
            v-if="localForm.type === 'individual'"
            ref="cpfInput"
            id="cpf"
            label="CPF"
            type="text"
            v-model="localForm.data.cpf"
            :required="true"
            :pattern="'\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'"
            :mask="maskCPF"
            :maxlength="14"
          />
          <WsInputBase
            v-if="localForm.type === 'business'"
            ref="cnpjInput"
            id="cnpj"
            label="CNPJ"
            type="text"
            v-model="localForm.data.cnpj"
            :required="true"
            :pattern="'\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}'"
            :mask="maskCNPJ"
            :maxlength="18"
          />
          <WsInputBase
          v-if="localForm.type === 'individual'"
            ref="birthdateInput"
            id="birthdate"
            label="Data de Nascimento"
            type="date"
            v-model="localForm.data.birthdate"
            :required="true"
          />
          <WsInputBase
            v-if="localForm.type === 'business'"
            ref="birthdateInput"
            id="birthdate"
            label="Data de Nascimento"
            type="date"
            v-model="localForm.data.companyOpeningDate"
            :required="true"
          />
          <WsInputBase
            ref="phoneInput"
            id="phone"
            label="Número de Telefone"
            type="text"
            v-model="localForm.data.phone"
            :required="true"
            :pattern="'\\(\\d{2}\\) \\d{4,5}-\\d{4}'"
            :mask="maskPhone"
            :maxlength="15"
          />
          <WsInputBase
            ref="emailInput"
            id="email"
            label="Endereço de e-mail"
            type="email"
            v-model="localForm.email"
            :required="true"
            :pattern="'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'"
          />
          <div class="form-step__footer">
            <button class="form-step__footer--button-prev" type="button" @click="props.prev">Voltar</button>
            <button class="form-step__footer--button-next" type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, inject } from 'vue';
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
    },
    submit: {
      type: Function,
      required: true
    }
  });
  
  const emit = defineEmits(['update:form']);

  const postRegister = inject('submitFormApi')

  
  
  const localForm = ref({ ...props.form });
  
  const nameInput = ref(null);
  const cpfInput = ref(null);
  const cnpjInput = ref(null);
  const birthdateInput = ref(null);
  const phoneInput = ref(null);
  const emailInput = ref(null);
  
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Elimina cualquier carácter que no sea número
      .replace(/(\d{3})(\d)/, '$1.$2') // Aplica el primer punto
      .replace(/(\d{3})(\d)/, '$1.$2') // Aplica el segundo punto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Aplica el guion
  };
  
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
  
    // Validate all inputs
    const inputs = [
      nameInput.value,
      cpfInput.value,
      cnpjInput.value,
      birthdateInput.value,
      phoneInput.value,
      emailInput.value
    ];
    inputs.forEach(input => {
      if (input && !input.validate()) {
        isValid = false;
      }
    });
  
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      emit('update:form', localForm.value);
      console.log('aqui')
      postRegister()
    }
  };
  </script>