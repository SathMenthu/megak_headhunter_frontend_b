<template>
  <div class="dark-bgc mt-1">
    <div class="p-3 flex justify-between w-full">
      <div class="relative rounded w-1/4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <mdicon class="filter-input-icon-color" name="magnify" />
        </span>
        <button class="absolute inset-y-0 right-1 flex items-center pl-2">
          <mdicon
            class="filter-input-icon-color hover:text-gray-300"
            name="close"
          />
        </button>
        <div>
          <input
            class="dark-bgc2 filter-input-icon-color pl-10 px-3 py-2 focus:outline-none focus:shadow-outline w-full"
            type="text"
            autocomplete="new-search"
            placeholder="Szukaj"
            v-model="search"
            @input="debounceDataFromTable()"
            v-on:keyup.enter="getDataTable()"
          />
        </div>
      </div>
      <div>
        <button
          class="flex justify-center filter-button text-sm hover:bg-gray-900"
          @click="hrFiltersModal = true"
        >
          <mdicon class="filter-button-icon" name="filter"></mdicon>
          <span class="mr-2">Filtrowanie</span>
        </button>
      </div>
    </div>
  </div>
  <div class="dark-bgc mt-1 p-3">
    <div class="flex-table" v-for="user in userStore.userForTargetHR">
      <div class="flex justify-between p-2">
        <div class="flex gap-20">
          <div class="grid w-fill">
            <span class="text-sm header-in-table">Rezerwacja do</span>
            <span class="font-bold text-sm tracking-widest">
              {{
                user.reservationEndDate &&
                formatDate(new Date(user.reservationEndDate))
              }}
              r.
            </span>
          </div>
          <div class="flex items-center">
            <img :src="user?.avatar" class="w-16 h-16 py-2 px-2 rounded-full" />
            <span class="flex items-end"
              >{{ user.firstName }} {{ user.lastName }}</span
            >
          </div>
        </div>

        <div class="flex items-center">
          <button class="add-button px-2 py-1.5 mr-5" @click="showUserCV(user)">
            Pokaż CV
          </button>
          <button
            class="add-button px-2 py-1.5 mr-5"
            @click="UnreserveStudent(user)"
          >
            Brak Zainteresowania
          </button>
          <button class="add-button px-2 py-1.5" @click="HireStudent(user)">
            Zatrudniony
          </button>
          <mdicon
            @click="targerUser = targerUser === user ? null : user"
            class="ml-3 cursor-pointer filter-input-icon-color"
            size="32px"
            :name="targerUser === user ? 'chevron-down' : 'chevron-up'"
          ></mdicon>
        </div>
      </div>

      <ItemInHrTable v-if="targerUser === user" :user="user" />
    </div>
  </div>
  <div class="flex justify-end mt-4 text-sm">
    <span>Ilość elementów</span>
    <div>
      <select v-model="limit" class="text-black w-auto border mx-3">
        <option
          :value="option.value"
          v-for="option in globalStore.perPageChoose"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="mr-3">
      {{ limit === 99999 ? total : userStore.userForTargetHR.length }} z
      {{ total }}
    </div>
    <button
      class="mr-2"
      :disabled="currentPage === 1"
      :class="{
        'arrow-pag': currentPage === 1,
        'arrow-pag-active': currentPage !== 1,
      }"
      @click="changePage(currentPage - 1)"
    >
      <mdicon name="chevron-left"></mdicon>
    </button>
    <button
      :disabled="limit !== userStore.userForTargetHR.length"
      :class="{
        'arrow-pag': limit !== userStore.userForTargetHR.length,
        'arrow-pag-active': limit === userStore.userForTargetHR.length,
      }"
      @click="changePage(currentPage + 1)"
    >
      <mdicon name="chevron-right"></mdicon>
    </button>
  </div>
  <HrFilterModal
    :filters="filters"
    v-if="hrFiltersModal"
    @close-modal="hrFiltersModal = false"
    @search-filters="(newFilters) => updateFilters(newFilters)"
    @reset-filters="
      (newFilters) => {
        search = '';
        updateFilters(newFilters);
      }
    "
  />
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { FilteredUser, HrFilters } from '../../types/index';
import { useGlobalStore } from '../../stores/global';
import { useUserStore } from '../../stores/user';
import { StudentStatus } from '../../types/enums/student.status.enum';
import ItemInHrTable from './ItemInHrTable.vue';
import router from '../../router';
import HrFilterModal from '../../components/filters/HrFilterModal.vue';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const studentStatus = ref<StudentStatus>(StudentStatus.BUSY);
const hrFiltersModal = ref(false);

let currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
let targerUser = ref();
const search = ref('');
const showReserveAlert = ref(false);
let filters = reactive<HrFilters>({
  search: '',
  courseCompletion: [],
  courseEngagement: [],
  projectDegree: [],
  teamProjectDegree: [],
  expectedTypeWork: [],
  expectedContractType: [],
  minSalary: null,
  maxSalary: null,
  canTakeApprenticeship: null,
  monthsOfCommercialExp: null,
});

getDataTable();

async function updateFilters(newFilters: HrFilters) {
  currentPage.value = 1;
  filters = newFilters;
  await getDataTable();
  hrFiltersModal.value = false;
}

function changePage(value: number) {
  currentPage.value = value;
  getDataTable();
}

watch(limit, async () => {
  currentPage.value = 1;
  await getDataTable();
});

watch(search, () => {
  filters.search = search.value;
});

function getDataTable() {
  filters.search = search.value;
  userStore
    .getAllUsersForTargetHr(
      currentPage.value,
      limit.value,
      filters,
      studentStatus.value,
    )
    .then((value) => {
      total.value = value ? value : 0;
    });
}

const debounceDataFromTable = () => {
  const timeoutId = window.setTimeout(() => {}, 0);
  for (let id = timeoutId; id >= 0; id -= 1) {
    window.clearTimeout(id);
  }

  setTimeout(() => {
    getDataTable();
  }, 500);
};

async function reserveTargetUser(user: FilteredUser) {
  showReserveAlert.value = false;
  await userStore.reserveTargetUser(user.id);
  getDataTable();
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('.');
}

function showUserCV(user: FilteredUser) {
  userStore.targetUser = user;
  router.push('user-cv');
}

async function HireStudent(user: FilteredUser) {
  if (await userStore.changeStudentStatus(user.id, StudentStatus.HIRED))
    getDataTable();
}

async function UnreserveStudent(user: FilteredUser) {
  if (await userStore.changeStudentStatus(user.id, StudentStatus.AVAILABLE))
    getDataTable();
}
</script>

<style>
.filter-input-icon-color {
  color: #666666;
}

.expanded-item {
  background: #2323249a;
}

.header-in-table {
  color: #b8b5b5;
  font-size: 10px;
}

.item-in-hr-table {
  font-size: 11px;
}

.rating-range {
  color: #9e9e9e;
}

.flex-table {
  border-bottom: 12px #222324 solid;
}
</style>
