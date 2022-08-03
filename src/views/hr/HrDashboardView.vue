<template>
  <ContentLayout>
    <div class="flex mt-3 dark-bgc">
      <div>
        <button
          @click="selectOneTab('availableStudentsMenu')"
          :class="{ 'active-tab': availableStudentsMenu }"
          class="p-5"
        >
          Dostępni Kursanci
        </button>

        <button
          @click="selectOneTab('interviewStudentsMenu')"
          :class="{ 'active-tab': interviewStudentsMenu }"
          class="p-5"
        >
          Do Rozmowy
        </button>
      </div>
    </div>

    <AvailableStudents v-if="availableStudentsMenu" />
    <InterviewStudents v-if="interviewStudentsMenu" />
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContentLayout from '../../components/layout/ContentLayout.vue';
import AvailableStudents from './AvailableStudents.vue';
import InterviewStudents from './InterviewStudents.vue';

const availableStudentsMenu = ref(true);
const interviewStudentsMenu = ref(false);

function selectOneTab(tabName: string) {
  switch (tabName) {
    case 'availableStudentsMenu':
      availableStudentsMenu.value = true;
      interviewStudentsMenu.value = false;
      break;
    case 'interviewStudentsMenu':
      availableStudentsMenu.value = false;
      interviewStudentsMenu.value = true;
      break;
  }
}
</script>
