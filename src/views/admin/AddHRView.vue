<template>
  <div class="dark-bgc p-2 grid gap-5 mt-1">
    <AddUserForm :role="role" :rules="rules" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AddUserForm from '../../components/forms/AddUserForm.vue';
import {
  required,
  email,
  helpers,
  minValue,
  maxValue,
} from '@vuelidate/validators';
const props = defineProps(['role']);

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      email: helpers.withMessage('Email musi być poprawny!', email),
    },
    firstName: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
    lastName: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
    company: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
    maxReservedStudents: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      minValue: helpers.withMessage(
        'Wartość musi wynosić minimum 1',
        minValue(1),
      ),
      maxValue: helpers.withMessage(
        'Wartość może wynosić maksymalnie 999',
        maxValue(999),
      ),
    },
  };
});
</script>
