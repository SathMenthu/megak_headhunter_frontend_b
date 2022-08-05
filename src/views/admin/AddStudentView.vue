<template>
  <div class="dark-bgc p-2 grid gap-5 mt-1">
    <AddUserForm :role="role" :rules="rules" />
  </div>

  <div class="dark-bgc p-2 mt-1 flex flex-col gap-5">
    <span class="p-1 font-bold">Import Użytkowników</span>
    <div class="mb-1 pl-6 flex flex-col w-1/3">
      <input ref="file" class="p-3 border mb-6" type="file" />
      <button class="add-button" @click="sendUsersToImport()">Wyślij</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import AddUserForm from '../../components/forms/AddUserForm.vue';
import { required, email, helpers, between } from '@vuelidate/validators';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

const props = defineProps(['role']);
const file = ref<HTMLInputElement | null>(null);

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
    courseCompletion: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      between: helpers.withMessage(
        'Ocena musi być w przedziale od 1 do 5',
        between(1, 5),
      ),
    },
    courseEngagement: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      between: helpers.withMessage(
        'Ocena musi być w przedziale od 1 do 5',
        between(1, 5),
      ),
    },
    projectDegree: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      between: helpers.withMessage(
        'Ocena musi być w przedziale od 1 do 5',
        between(1, 5),
      ),
    },
    teamProjectDegree: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      between: helpers.withMessage(
        'Ocena musi być w przedziale od 1 do 5',
        between(1, 5),
      ),
    },
  };
});

async function sendUsersToImport() {
  if (file?.value?.files) {
    const userForm: FormData = new FormData();
    userForm.append('file', file.value.files[0]);

    userStore.importUsersFromCSV(userForm);
  }

  //Upload to server
}
</script>
