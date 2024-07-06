<template>
    <div class="type-selector">
      <input type="radio" id="individual" value="individual" v-model="localType" />
      <label :class="{ selected: localType === 'individual' }" for="individual">
        <span class="custom-radio"></span>
        Pessoa Física
      </label>
      <input type="radio" id="business" value="business" v-model="localType" />
      <label :class="{ selected: localType === 'business' }" for="business">
        <span class="custom-radio"></span>
        Pessoa Jurídica
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const localType = ref(props.modelValue);
  
  watch(localType, (newValue) => {
    emit('update:modelValue', newValue);
  });
  </script>
  
  <style scoped>
    @import './WsTypeSelector.scss'
  </style>
  