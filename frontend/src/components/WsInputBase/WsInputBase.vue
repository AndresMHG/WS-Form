<template>
  <div class="input-wrapper">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      @blur="validate"
      @input="handleInput"
      :class="{ error: hasError }"
      :maxlength="maxlength"
    />
    <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, watch, defineExpose } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String,
    default: ''
  },
  customValidator: {
    type: Function,
    default: null
  },
  mask: {
    type: Function,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);
const hasError = ref(false);
const errorMessage = ref('');

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const validate = () => {
  hasError.value = false;
  errorMessage.value = '';

  if (props.required && !inputValue.value) {
    hasError.value = true;
    errorMessage.value = 'Este campo é obrigatório.';
    return false;
  }

  if (props.pattern) {
    const regex = new RegExp(props.pattern);
    if (!regex.test(inputValue.value)) {
      hasError.value = true;
      errorMessage.value = 'Formato inválido.';
      return false;
    }
  }

  if (props.customValidator) {
    const customError = props.customValidator(inputValue.value);
    if (customError) {
      hasError.value = true;
      errorMessage.value = customError;
      return false;
    }
  }

  return true;
};

const handleInput = (event) => {
  let value = event.target.value;

  if (props.mask) {
    value = props.mask(value);
  }

  inputValue.value = value;
};

defineExpose({ validate });
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-wrapper input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
  transition: border-color 0.3s;
}

.input-wrapper input.error {
  border-color: red;
}

.input-wrapper .error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
