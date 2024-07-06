<template>
  <div>
    <h2>Set Password</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="localForm.password" required />
      </div>
      <button type="button" @click="props.prev">Back</button>
      <button type="submit">Next</button>
    </form>
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
  props.next();
};
</script>

<style scoped>
/* Your styles here */
</style>
