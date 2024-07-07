<template>
  <div class="form-step">
    <div class="form-step__header">
      <span>Etapa <span class="form-step__header--step-number">1</span> de 4 </span>
      <h2>Seja bem vindo(a)</h2>
    </div>
    <div class="form-step__body">
      <form @submit.prevent="handleSubmit">
        <WsInputBase
          ref="emailInput"
          id="email"
          label="Endereço de e-mail"
          type="email"
          placeholder="teste@gmail.com"
          v-model="localForm.email"
          :required="true"
          :pattern="'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'"
        />
        <WsTypeSelector v-model="localForm.type" />
        <div class="form-step__footer">
          <button class="form-step__footer--button-next" type="submit">Continuar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import WsInputBase from '@/components/WsInputBase/WsInputBase.vue';
import WsTypeSelector from '@/components/WsTypeSelector/WsTypeSelector.vue';

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
const emailInput = ref(null);

const validateForm = () => {
  let isValid = true;

  // Validate email input
  if (!emailInput.value.validate()) {
    isValid = false;
  }

  // Validate type
  if (!localForm.value.type) {
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