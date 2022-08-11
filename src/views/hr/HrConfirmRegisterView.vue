<template>
  <div class="bg-[#292a2b]">
    <div class="bg-[#292a2b] p-5 grid mt-3">
      <span class="font-bold text-center text-lg"
        >Potwierdzenie Rejestracji</span
      >
      <form class="grid items-center justify-center p-1">
        <div class="flex-form">
          <label for="email" class=""> Email </label>
          <input
            disabled
            id="email"
            class="px-1 py-1"
            v-model="editedUser.email"
            placeholder="Email"
            type="email"
          />
          <span v-if="v$.email.$error" class="valid mt-2">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
        <div class="flex-form">
          <label for="password"> Hasło </label>
          <input
            id="password"
            class="edit-data-input"
            v-model="editedUser.password"
            placeholder="Hasło"
            type="password"
          />
          <span v-if="v$.password.$error" class="ml-5 valid mt-2">{{
            v$.password.$errors[0].$message
          }}</span>
        </div>
        <div class="flex-form">
          <label for="confirmPassword" class="">Potwierdź Hasło </label>
          <input
            id="confirmPassword"
            class="edit-data-input"
            v-model="editedUser.confirmPassword"
            placeholder="Potwierdź Hasło"
            type="password"
          />
          <span v-if="v$.confirmPassword.$error" class="valid mt-2">{{
            v$.confirmPassword.$errors[0].$message
          }}</span>
        </div>
        <div class="flex-form">
          <label for="name" class=""> Imię </label>
          <input
            id="firstName"
            class="edit-data-input"
            v-model="editedUser.firstName"
            placeholder="Imię"
            type="text"
          />
          <span v-if="v$.firstName.$error" class="valid mt-2">{{
            v$.firstName.$errors[0].$message
          }}</span>
        </div>
        <div class="flex-form">
          <label for="lastName"> Nazwisko </label>
          <input
            id="lastName"
            class="edit-data-input"
            v-model="editedUser.lastName"
            placeholder="Nazwisko"
            type="text"
          />
          <span v-if="v$.lastName.$error" class="valid mt-2">{{
            v$.lastName.$errors[0].$message
          }}</span>
        </div>

        <div class="flex-form">
          <label for="company"> Nazwa Firmy </label>
          <input
            id="company"
            class="edit-data-input"
            v-model="editedUser.company"
            placeholder="Firma"
            type="text"
          />
        </div>
      </form>
    </div>
    <div class="flex-center">
      <button @click.prevent="submitForm()" class="add-button p-4 mt-4 mb-10">
        Potwierdź Rejestracje
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useUserStore } from '../../stores/user.js';
import {
  required,
  email,
  helpers,
  minLength,
  sameAs,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const props = defineProps(['user']);
const userStore = useUserStore();

const editedUser = reactive(Object.assign({}, props.user));

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
    password: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      minLength: helpers.withMessage(
        'Hasło musi mieć minimum 6 znaków!',
        minLength(6),
      ),
    },
    confirmPassword: {
      sameAs: helpers.withMessage(
        'Hasła muszą być takie same',
        sameAs(editedUser.password),
      ),
    },
  };
});

const v$ = useVuelidate(rules, editedUser);

async function submitForm() {
  if (await v$.value.$validate()) {
    userStore.confirmRegister(editedUser);
  }
}
</script>
