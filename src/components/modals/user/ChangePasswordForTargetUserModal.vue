<template>
  <div class="fixed inset-0 filter-bg transition-opacity"></div>
  <div class="fixed filter-container-center">
    <div class="shadow-lg flex flex-col text-sm">
      <div class="flex items-center justify-center p-4">
        <h5 class="text-xl">Edycja Hasła Użytkownika</h5>
      </div>
      <div class="grid overflow-hidden">
        <label class="flex items-baseline justify-between w-full ml-2">
          <span class="mr-5">Hasło:</span>
          <div class="flex flex-col items-end">
            <input
              autocomplete="new-password"
              type="password"
              v-model="password"
              class="text-gray-800 w-64 p-2 mt-3 mr-6"
              placeholder="Hasło"
            />
            <span v-if="v$.password.$error" class="ml-5 valid mt-2">{{
              v$.password.$errors[0].$message
            }}</span>
          </div>
        </label>

        <label class="text-white flex items-baseline justify-between ml-2">
          <span class="mr-5">Potwierdź hasło:</span>
          <div class="flex flex-col items-end">
            <input
              autocomplete="new-confirm-password"
              type="password"
              placeholder="Potwierdź Hasło"
              v-model="confirmPassword"
              class="text-gray-800 w-64 p-2 mt-3 mr-4"
            />
            <span v-if="v$.confirmPassword.$error" class="valid mt-2">{{
              v$.confirmPassword.$errors[0].$message
            }}</span>
          </div>
        </label>
      </div>

      <div class="flex justify-between p-4">
        <button
          type="button"
          class="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 ease-in-out w-40"
          @click="submitForm()"
        >
          Potwierdź
        </button>
        <button
          type="button"
          class="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 ease-in-out w-40"
          data-bs-dismiss="modal"
          @click="$emit('closeChangeUserPasswordDialog')"
        >
          Anuluj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers, sameAs } from '@vuelidate/validators';

const props = defineProps(['user']);
const emit = defineEmits([
  'changeUserPasswordAndCloseDialog',
  'closeChangeUserPasswordDialog',
]);

const password = ref('');
const confirmPassword = ref('');

const rules = {
  password: {
    required: helpers.withMessage('Pole nie może być puste!', required),
    minLength: helpers.withMessage(
      'Hasło musi mieć minimum 6 znaków!',
      minLength(6),
    ),
  },
  confirmPassword: {
    sameAs: helpers.withMessage('Hasła muszą być takie same', sameAs(password)),
  },
};

const v$ = useVuelidate(rules, {
  password,
  confirmPassword,
});

async function submitForm() {
  if (await v$.value.$validate()) {
    emit('changeUserPasswordAndCloseDialog', props.user, password.value);
  }
}
</script>
