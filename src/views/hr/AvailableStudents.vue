<template>
  <div class="bg-[#292a2b] mt-1">
    <div class="p-3 flex justify-between w-full">
      <div class="relative rounded w-1/4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <mdicon class="text-[#4D4D4D]" name="magnify" />
        </span>
        <button class="absolute inset-y-0 right-1 flex items-center pl-2">
          <mdicon
            class="text-[#4D4D4D] hover:text-gray-300"
            name="close"
          />
        </button>
        <div>
          <input
            class="bg-[#1e1e1f] placeholder:text-[#666666] pl-10 px-3 py-2 focus:outline-none focus:shadow-outline w-full"
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
          <mdicon class="text-[#4d4d4d]" name="filter"></mdicon>
          <span class="mr-2 leading-7 text-base">Filtrowanie</span>
        </button>
      </div>
    </div>
  </div>
  <div class="bg-[#292a2b] mt-1 p-3">
    <div class="border-b-[12px] border-[#222324]" v-for="user in userStore.userForHR">
      <div class="flex justify-between p-2">
        <span class="flex items-end text-sm text-lg"
          >{{ user.firstName }} {{ user.lastName[0] }}.</span
        >
        <div class="flex items-center">
          <button
            class="add-button"
            @click="reserveTargetUser(user)"
          >
            Zarezerwuj rozmowę
          </button>
          <mdicon
            size="32px"
            @click="targerUser = targerUser === user ? null : user"
            class="ml-3 cursor-pointer text-[#666666]"
            :name="targerUser === user ? 'chevron-up' : 'chevron-down'"
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
      {{ itemsInPage }}

      z
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
      :disabled="limit !== userStore.userForHR.length"
      :class="{
        'arrow-pag': limit !== userStore.userForHR.length,
        'arrow-pag-active': limit === userStore.userForHR.length,
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
import HrFilterModal from '../../components/filters/HrFilterModal.vue';
import { calcItemsInPag } from '../../components/pagination/calcItemsInPag';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const studentStatus = ref<StudentStatus>(StudentStatus.AVAILABLE);
const itemsInPage = ref(0);
let currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
let targerUser = ref();
const search = ref('');
const showReserveAlert = ref(false);
const hrFiltersModal = ref(false);
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
    .getAllUsersForHr(
      currentPage.value,
      limit.value,
      filters,
      studentStatus.value,
    )
    .then((value) => {
      total.value = value ? value : 0;
      itemsInPage.value = calcItemsInPag(
        limit.value,
        total.value,
        currentPage.value,
        userStore.userForHR.length,
      );
    });
}
async function updateFilters(newFilters: HrFilters) {
  currentPage.value = 1;
  filters = newFilters;
  await getDataTable();
  hrFiltersModal.value = false;
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
</script>

