<template>
  <ContentLayout>
    <div class="flex mt-3 dark-bgc">
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
          @click="selectOneTab('addUserTab')"
          :class="{ 'active-tab': addUserTab }"
          class="p-5"
        >
          Dodaj Kursanta
        </button>
      </div>
    </div>
    <UserListViewVue v-if="userListTab" />
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContentLayout from '../../components/layout/ContentLayout.vue';
import UserListViewVue from './UserListView.vue';

const userListTab = ref(true);
const addHrTab = ref(false);
const addUserTab = ref(false);

function selectOneTab(tabName: string) {
  switch (tabName) {
    case 'userListTab':
      addHrTab.value = false;
      addUserTab.value = false;
      userListTab.value = true;
      break;
    case 'addHrTab':
      addUserTab.value = false;
      userListTab.value = false;
      addHrTab.value = true;
      break;
    case 'addUserTab':
      userListTab.value = false;
      addHrTab.value = false;
      addUserTab.value = true;
      break;
  }
}
</script>
