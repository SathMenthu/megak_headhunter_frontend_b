<template>
  <div class="dark-bgc p-2 grid gap-5 mt-3">
    <span class="p-1 font-bold">Dodawanie Użytkownika</span>
    <form class="flex flex-col w-1/3 gap-1 pl-6">
      <label for="email" class=""> Email </label>
      <input
        id="email"
        class="dark-bgc2 px-1 py-1"
        v-model="user.email"
        placeholder="Email"
        type="email"
      />
      <span v-if="v$.email.$error" class="valid">{{
        v$.email.$errors[0].$message
      }}</span>
      <label for="name" class=""> Imię </label>
      <input
        id="firstName"
        class="dark-bgc2 px-1 py-1"
        v-model="user.firstName"
        placeholder="Imię"
        type="text"
      />
      <span v-if="v$.firstName.$error" class="valid">{{
        v$.firstName.$errors[0].$message
      }}</span>
      <label for="lastName"> Nazwisko </label>
      <input
        id="lastName"
        class="dark-bgc2 px-1 py-1"
        v-model="user.lastName"
        placeholder="Nazwisko"
        type="text"
      />
      <span v-if="v$.lastName.$error" class="valid">{{
        v$.lastName.$errors[0].$message
      }}</span>
      <label v-if="user.permission === 'HR'" for="company"> Firma </label>
      <input
        v-if="user.permission === 'HR'"
        id="company"
        class="dark-bgc2 px-1 py-1"
        v-model="user.company"
        placeholder="Firma"
        type="text"
      />
      <label v-if="user.permission === 'HR'" for="maxReservedStudents">
        Limit Rezerwacji Kursantów:
      </label>
      <span
        v-if="user.permission === 'HR' && v$.company.$error"
        class="valid"
        >{{ v$.company.$errors[0].$message }}</span
      >
      <input
        id="maxReservedStudents"
        class="dark-bgc2 px-1 py-1"
        v-model="user.maxReservedStudents"
        placeholder="Limit Rezerwacji Kursantów"
        type="number"
        v-if="user.permission === 'HR'"
      />
      <span
        v-if="user.permission === 'HR' && v$.maxReservedStudents.$error"
        class="valid"
        >{{ v$.maxReservedStudents.$errors[0].$message }}</span
      >
      <label for="permission"> Rola: </label>
      <input
        id="permission"
        class="px-1 py-1"
        v-model="user.permission"
        placeholder="Rola"
        type="text"
        disabled
      />
      <button @click.prevent="submitForm()" class="add-button mt-4 mb-10">
        Dodaj
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useUserStore } from '../../stores/user.js';
import { ManuallyCreatedUser } from '../../types/index.js';
import useVuelidate from '@vuelidate/core';

const userStore = useUserStore();

const props = defineProps(['role', 'rules']);
const user = reactive<ManuallyCreatedUser>({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  maxReservedStudents: 1,
  permission: props.role,
});

const v$ = useVuelidate(props.rules, user);

async function submitForm() {
  if (await v$.value.$validate()) {
    const isSuccess = await userStore.createUser(user);
    if (isSuccess) {
      v$.value.$reset();
      user.firstName = '';
      user.lastName = '';
      user.email = '';
      user.company = '';
      user.maxReservedStudents = 1;
      user.permission = props.role;
    }
  }
}
</script>
