<template>
  <div class="form-step">
    <div class="form-step__header">
      <span>Etapa <strong>3</strong> de 4 </span>
      <h2>Sua senha</h2>
    </div>
    <div class="form-step__body">
      <form @submit.prevent="handleSubmit">
        <WsInputBase
          ref="passwordInput"
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          v-model="localForm.password"
          :required="true"
          :custom-validator="validatePassword"
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

const passwordInput = ref(null);

const validatePassword = (value) => {
  if (value.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres.';
  }
  return '';
};

const validateForm = () => {
  let isValid = true;

  // Validate password input
  if (!passwordInput.value.validate()) {
    isValid = false;
  }
  if(!isValid) addNotification('warning', 'É necessário inserir uma senha')

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit('update:form', localForm.value);
    props.next();
  }
};
</script>