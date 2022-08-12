<template>
  <ContentLayout>
    <div class="flex mt-3 bg-[#292a2b]">
      <div>
        <button
          @click="selectOneTab('userListTab')"
          :class="{ 'active-tab': userListTab }"
          class="p-5"
        >
          Lista Użytkowników
        </button>

        <button
          @click="selectOneTab('addHrTab')"
          :class="{ 'active-tab': addHrTab }"
          class="p-5"
        >
          Dodaj HR
        </button>

        <button
          @click="selectOneTab('addStudentTab')"
          :class="{ 'active-tab': addStudentTab }"
          class="p-5"
        >
          Dodaj Kursanta
        </button>
      </div>
    </div>
    <UserListViewVue v-if="userListTab" />
    <AddHRView v-if="addHrTab" :role="'HR'" />
    <AddStudentView v-if="addStudentTab" :role="'STUDENT'" />
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContentLayout from '../../components/layout/ContentLayout.vue';
import AddHRView from './AddHRView.vue';
import AddStudentView from './AddStudentView.vue';
import UserListViewVue from './UserListView.vue';

const userListTab = ref(true);
const addHrTab = ref(false);
const addStudentTab = ref(false);

function selectOneTab(tabName: string) {
  switch (tabName) {
    case 'userListTab':
      addHrTab.value = false;
      addStudentTab.value = false;
      userListTab.value = true;
      break;
    case 'addHrTab':
      addStudentTab.value = false;
      userListTab.value = false;
      addHrTab.value = true;
      break;
    case 'addStudentTab':
      userListTab.value = false;
      addHrTab.value = false;
      addStudentTab.value = true;
      break;
  }
}
</script>
