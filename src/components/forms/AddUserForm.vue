<template>
  <div class="bg-[#292a2b] p-2 grid gap-5 mt-3">
    <span class="p-1 font-bold">Dodawanie Użytkownika</span>
    <form class="flex flex-col gap-1 pl-6">
      <label for="email" class=""> Email </label>
      <input
        id="email"
        class="add-user-input"
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
        class="add-user-input"
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
        class="add-user-input"
        v-model="user.lastName"
        placeholder="Nazwisko"
        type="text"
      />
      <span v-if="v$.lastName.$error" class="valid">{{
        v$.lastName.$errors[0].$message
      }}</span>

      <div class="grid gap-1" v-if="user.permission === 'STUDENT'">
        <label for="courseCompletion"> Ocena przejścia kursu </label>
        <input
          id="courseCompletion"
          class="add-user-input"
          v-model="user.courseCompletion"
          placeholder="Ocena od 1 do 5"
          type="number"
        />
        <span v-if="v$.courseCompletion.$error" class="valid">{{
          v$.courseCompletion.$errors[0].$message
        }}</span>
      </div>
      <div class="grid gap-1" v-if="user.permission === 'STUDENT'">
        <label for="courseEngagement">
          Ocena aktywności i zaangażowania na kursie
        </label>
        <input
          id="courseEngagement"
          class="add-user-input"
          v-model="user.courseEngagement"
          placeholder="Ocena od 1 do 5"
          type="number"
        />
        <span v-if="v$.courseEngagement.$error" class="valid">{{
          v$.courseEngagement.$errors[0].$message
        }}</span>
      </div>
      <div class="grid gap-1" v-if="user.permission === 'STUDENT'">
        <label for="projectDegree"> Ocena kodu w projekcie własnym </label>
        <input
          id="projectDegree"
          class="add-user-input"
          v-model="user.projectDegree"
          placeholder="Ocena od 1 do 5"
          type="number"
        />
        <span v-if="v$.projectDegree.$error" class="valid">{{
          v$.projectDegree.$errors[0].$message
        }}</span>
      </div>
      <div class="grid gap-1" v-if="user.permission === 'STUDENT'">
        <label for="teamProjectDegree"> Ocena pracy w zespole w Scrum </label>
        <input
          id="teamProjectDegree"
          class="add-user-input"
          v-model="user.teamProjectDegree"
          placeholder="Ocena od 1 do 5"
          type="number"
        />
        <span v-if="v$.teamProjectDegree.$error" class="valid">{{
          v$.teamProjectDegree.$errors[0].$message
        }}</span>
      </div>
      <label v-if="user.permission === 'HR'" for="company"> Firma </label>
      <input
        v-if="user.permission === 'HR'"
        id="company"
        class="bg-[#1e1e1f] px-1 py-1 w-fit"
        v-model="user.company"
        placeholder="Firma"
        type="text"
      />
      <span
        v-if="user.permission === 'HR' && v$.company.$error"
        class="valid"
        >{{ v$.company.$errors[0].$message }}</span
      >
      <label v-if="user.permission === 'HR'" for="maxReservedStudents">
        Limit Rezerwacji Kursantów:
      </label>
      <input
        id="maxReservedStudents"
        class="add-user-input"
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
        class="px-1 py-1 w-1/3"
        v-model="user.permission"
        placeholder="Rola"
        type="text"
        disabled
      />
      <button @click.prevent="submitForm()" class="add-button mt-4 mb-10 w-1/3">
        Dodaj
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/user.js';
import { ManuallyCreatedUser } from '../../types/index.js';
import useVuelidate from '@vuelidate/core';

const userStore = useUserStore();

const props = defineProps(['role', 'rules']);
const user = ref<ManuallyCreatedUser>({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  maxReservedStudents: 1,
  permission: props.role,
  courseCompletion: null,
  courseEngagement: null,
  projectDegree: null,
  teamProjectDegree: null,
});

const v$ = useVuelidate(props.rules, user);

async function submitForm() {
  if (await v$.value.$validate()) {
    const isSuccess = await userStore.createUser(user.value);
    if (isSuccess) {
      v$.value.$reset();
      user.value.firstName = '';
      user.value.lastName = '';
      user.value.email = '';
      user.value.company = '';
      user.value.maxReservedStudents = 1;
      user.value.permission = props.role;
      user.value.courseCompletion = null;
      user.value.courseEngagement = null;
      user.value.projectDegree = null;
      user.value.teamProjectDegree = null;
    }
  }
}
</script>
