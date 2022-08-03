<template>
  <div class="flex justify-center items-center h-screen">
    <StudentEditDataView
      :user="user"
      v-if="user?.permission === 'STUDENT'"
      :type="'register'"
    />
    <HrConfirmRegisterView :user="user" v-if="user?.permission === 'HR'" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { useUserStore } from '../stores/user.js';
import { FilteredUser } from '../types/index';
import HrConfirmRegisterView from '../views/hr/HrConfirmRegisterView.vue';
import StudentEditDataView from './student/StudentEditDataView.vue';
const urlParams = ref(new URLSearchParams(window.location.search));
const id = ref(urlParams.value.get('id'));
const token = ref(urlParams.value.get('token'));

const user = ref<FilteredUser | null>(null);

const userStore = useUserStore();

onBeforeMount(async () => {
  if (typeof id.value === 'string' && typeof token.value === 'string') {
    const validRegUser = await userStore.checkRegisterLink({
      id: id.value,
      token: token.value,
    });
    if (validRegUser) {
      user.value = validRegUser;
    }
  }
});
</script>
