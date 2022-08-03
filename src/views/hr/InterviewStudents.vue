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
          />
        </div>
      </div>
      <div>
        <button
          class="flex justify-center filter-button text-sm hover:bg-gray-900"
        >
          <mdicon class="filter-button-icon" name="filter"></mdicon>
          <span class="mr-2">Filtrowanie</span>
        </button>
      </div>
    </div>
  </div>
  <div class="dark-bgc mt-1 p-3">
    <div v-for="user in userStore.userForTargetHR">
      <div class="flex justify-between p-2 flex-table">
        <span class="flex items-end text-sm"
          >{{ user.firstName }} {{ user.lastName[0] }}.</span
        >
        <div class="flex items-center">
          <button
            class="add-button px-2 py-1.5"
            @click="showReserveAlert = true"
          >
            Zarezerwuj rozmowę
          </button>
          <mdicon
            @click="targerUser = targerUser === user ? null : user"
            class="ml-3 cursor-pointer filter-input-icon-color"
            :name="targerUser === user ? 'chevron-down' : 'chevron-up'"
          ></mdicon>
        </div>
      </div>
      <ItemInHrTable v-if="targerUser === user" :user="user" />
      <ReservationStudentAlert
        @confirmAndCloseDialog="reserveTargetUser(user)"
        @closeDialog="showReserveAlert = false"
        v-if="showReserveAlert"
        :user="user"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { FilteredUser, HrFilters } from '../../types/index';
import { useGlobalStore } from '../../stores/global';
import { useUserStore } from '../../stores/user';
import { StudentStatus } from '../../types/enums/student.status.enum';
import ItemInHrTable from './ItemInHrTable.vue';
import ReservationStudentAlert from './ReservationStudentAlert.vue';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const studentStatus = ref<StudentStatus>(StudentStatus.BUSY);

let currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
let targerUser = ref();
const search = ref('');
const showReserveAlert = ref(false);
let filters = reactive<HrFilters>({
  search: '',
  courseCompletion: null,
  courseEngagement: null,
  projectDegree: null,
  teamProjectDegree: null,
  expectedTypeWork: null,
  expectedContractType: null,
  minSalary: null,
  maxSalary: null,
  canTakeApprenticeship: null,
  monthsOfCommercialExp: null,
  sortDirection: false,
  sortTarget: 'email',
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
    .getAllUsersForTargetHr(
      currentPage.value,
      limit.value,
      filters,
      studentStatus.value,
    )
    .then((value) => {
      if (value) total.value = value;
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
