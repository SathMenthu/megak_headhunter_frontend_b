<template>
  <div class="dark-bgc">
    <div class="dark-bgc p-2 grid mt-3">
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
        </div>
        <div class="flex-form">
          <label for="name" class=""> Imię </label>
          <input
            id="firstName"
            class="dark-bgc2 px-1 py-1"
            v-model="editedUser.firstName"
            placeholder="Imię"
            type="text"
          />
        </div>
        <div class="flex-form">
          <label for="lastName"> Nazwisko </label>
          <input
            id="lastName"
            class="dark-bgc2 px-1 py-1"
            v-model="editedUser.lastName"
            placeholder="Nazwisko"
            type="text"
          />
        </div>

        <div class="flex-form">
          <label for="company"> Nazwa Firmy </label>
          <input
            id="company"
            class="dark-bgc2 px-1 py-1"
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
import { useUserStore } from '../../stores/user.js';

const props = defineProps(['user']);
const userStore = useUserStore();

const editedUser = Object.assign({}, props.user);

function submitForm() {
  userStore.confirmRegister(editedUser);
}
</script>
