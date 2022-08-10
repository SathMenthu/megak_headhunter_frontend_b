<template>
  <div class="text-white flex justify-center items-center h-screen">
    <div class="grid place-items-center w-1/5 max-w-sm">
      <img class="object-contain mb-5 w-32" src="../assets/logo.webp" alt="MegaK logo"/>
      <form class="w-full mb-3" v-on:keyup.enter="submitForm()">
        <div class="rounded mb-2">
          <div>
            <input
              class="login-input mb-1"
              type="email"
              placeholder="E-mail"
              v-model="user.email"
            />
          </div>
          <span v-if="v$.email.$error" class="valid">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>

        <div class="rounded">
          <input
            class="login-input"
            type="password"
            placeholder="Hasło"
            v-model="user.password"
          />
          <span v-if="v$.password.$error" class="valid">{{
            v$.password.$errors[0].$message
          }}</span>
        </div>
      </form>
      <button class="text-right w-full text-sm mb-8">
        <span class="tracking-wider font-medium">Zapomniałeś hasła ? </span>
      </button>
      <div class="flex justify-between w-full items-center">
        <span class="text-sm tracking-wide"
          >Nie masz konta?
          <button class="underline font-bold tracking-wide">Zarejestruj się</button></span
        >
        <button
          class="p-2 bg-red-500 hover:bg-red-400"
          @click.prevent="submitForm()"
        >
          Zaloguj się
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const user = reactive({
  email: '',
  password: '',
});

const authStore = useAuthStore();

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      email: helpers.withMessage('Email musi być poprawny!', email),
    },
    password: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
  };
});

const v$ = useVuelidate(rules, user);

async function submitForm() {
  if (await v$.value.$validate()) {
    await authStore.login(user);
  }
}
</script>

