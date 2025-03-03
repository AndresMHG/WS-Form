<template>
    <div class="form-step">
      <div class="form-step__header">
        <span>Etapa <strong>4</strong> de 4 </span>
        <h2>Revisão dos Dados</h2>
      </div>
      <div class="form-step__body">
        <form @submit.prevent="handleSubmit">
          <WsInputBase
            ref="nameInput"
            :id="nameField.id"
            :label="nameField.label"
            type="text"
            v-model="nameField.model"
            :required="true"
          />
          <WsInputBase
            ref="cpfCnpjInput"
            :id="cpfCnpjField.id"
            :label="cpfCnpjField.label"
            type="text"
            v-model="cpfCnpjField.model"
            :required="true"
            :pattern="cpfCnpjField.pattern"
            :mask="cpfCnpjField.mask"
            :maxlength="cpfCnpjField.maxlength"
          />
          <WsInputBase
            ref="birthdateInput"
            id="birthdate"
            label="Data de Nascimento"
            type="date"
            v-model="birthdateField"
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
  import { defineProps, defineEmits, ref, inject, computed } from 'vue';
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
  const cpfCnpjInput = ref(null);
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
  
  const nameField = computed(() => {
    if (localForm.value.type === 'individual') {
      return {
        id: 'name',
        label: 'Nome',
        model: localForm.value.data.name
      };
    } else {
      return {
        id: 'name',
        label: 'Nome da Empresa',
        model: localForm.value.data.companyName,
        placeholder: 'Nome da Empresa'
      };
    }
  });
  
  const cpfCnpjField = computed(() => {
    if (localForm.value.type === 'individual') {
      return {
        id: 'cpf',
        label: 'CPF',
        model: localForm.value.data.cpf,
        pattern: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}',
        mask: maskCPF,
        maxlength: 14
      };
    } else {
      return {
        id: 'cnpj',
        label: 'CNPJ',
        model: localForm.value.data.cnpj,
        pattern: '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}',
        mask: maskCNPJ,
        maxlength: 18
      };
    }
  });
  
  const birthdateField = computed(() => {
    return localForm.value.type === 'individual'
      ? localForm.value.data.birthdate
      : localForm.value.data.companyOpeningDate;
  });
  
  const validateForm = () => {
    let isValid = true;
  
    // Validate all inputs
    const inputs = [
      nameInput.value,
      cpfCnpjInput.value,
      birthdateInput.value,
      phoneInput.value,
      emailInput.value
    ];
    inputs.forEach(input => {
      if (input && !input.validate()) {
        isValid = false;
      }
    });

    if(!isValid) addNotification('warning', 'Todos os campos são obrigatórios')

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
  