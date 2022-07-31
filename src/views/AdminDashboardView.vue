<template>
  <ContentLayout>
    <div class="flex mt-3 dark-bgc">
      <div class="relative">
        <button class="p-5">Użytkownicy</button>
        <div class="absolute bg-red-600 bottom-0 left-0 w-full h-1"></div>
      </div>
    </div>
    <div class="flex-center mt-1 dark-bgc">
      <div class="p-3 flex justify-end w-full">
        <button class="add-button mr-3">Dodaj Kursanta</button>
        <button class="add-button">Dodaj HR</button>
      </div>
    </div>
    <div class="flex-center mt-1 dark-bgc">
      <div class="p-3 flex justify-between w-full">
        <div class="relative rounded w-1/4">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <mdicon class="filter-input-icon-color" name="magnify" />
          </span>
          <div>
            <input
              class="dark-bgc2 filter-input-icon-color pl-10 px-3 py-2 shadow-lg hover:border focus:outline-none focus:shadow-outline w-full"
              type="text"
              placeholder="Szukaj"
              v-model="search"
              v-on:keyup.enter="getDataTable()"
            />
          </div>
        </div>
        <div>
          <button
            class="flex justify-center filter-button text-sm hover:bg-gray-900"
            @click="adminFiltersModal = true"
          >
            <mdicon class="filter-button-icon" name="filter"></mdicon>
            <span class="mr-2">Filtrowanie</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex mt-4 dark-bgc">
      <table class="m-3 w-full table-auto text-sm text-left shadow-2xl">
        <thead class="text-xs dark-bgc2">
          <tr>
            <th class="py-3 px-3" v-for="header in headers">
              <div class="flex justify-between items-center">
                {{ header }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="shadow-l table-down-border"
            v-for="user in userStore.userList"
          >
            <td class="td-row">
              {{ user.email }}
            </td>
            <td class="td-row">
              {{ user.firstName }}
            </td>
            <td class="td-row">
              {{ user.lastName }}
            </td>
            <td class="td-row flex">
              <SingleChipVue :text="user.permission" />
            </td>
            <td class="td-row uppercase font-bold">
              {{ user.accountBlocked === true ? 'Nie' : 'Tak' }}
            </td>
            <td>
              <button
                class="pointer transition relative group ml-2"
                @click="showBlockUserDialog(user)"
              >
                <mdicon
                  name="account-convert"
                  class="relative text-lime-500 hover:text-lime-400"
                >
                </mdicon>
                <div
                  class="group-hover:visible invisible transition duration-700 hover:duration-450 ease-in-out opacity-0 group-hover:opacity-100 text-xs absolute bg-gray-700 px-2 py-1 bg-opacity-75 cursor-auto -bottom-1 z-50 right-7"
                >
                  <span> Zmień Podstawowe Dane</span>
                </div>
              </button>
              <button
                class="pointer transition relative group ml-2"
                @click="showBlockUserDialog(user)"
              >
                <mdicon
                  name="lock-reset"
                  class="relative text-yellow-400 hover:text-yellow-300"
                >
                </mdicon>
                <div
                  class="group-hover:visible invisible transition duration-700 hover:duration-450 ease-in-out opacity-0 group-hover:opacity-100 text-xs absolute bg-gray-700 px-2 py-1 bg-opacity-75 cursor-auto -top-11 z-50"
                >
                  Zmień Hasło
                </div>
              </button>
              <button
                class="pointer transition relative group ml-2"
                @click="showBlockUserDialog(user)"
              >
                <mdicon
                  name="account-cancel-outline"
                  class="relative text-red-500 hover:text-red-400"
                >
                </mdicon>
                <div
                  class="group-hover:visible invisible transition duration-700 hover:duration-450 ease-in-out opacity-0 group-hover:opacity-100 text-xs absolute bg-gray-700 px-2 py-1 bg-opacity-75 cursor-auto -bottom-0 z-50 left-7"
                >
                  Zablokuj
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
        {{ limit === 99999 ? total : userStore.userList.length }} z
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
        :disabled="limit !== userStore.userList.length"
        :class="{
          'arrow-pag': limit !== userStore.userList.length,
          'arrow-pag-active': limit === userStore.userList.length,
        }"
        @click="changePage(currentPage + 1)"
      >
        <mdicon name="chevron-right"></mdicon>
      </button>
    </div>
    <AdminFilterModal
      :filters="filters"
      :roles="roles"
      v-if="adminFiltersModal"
      @close-modal="adminFiltersModal = false"
      @search-filters="(newFilters) => updateFilters(newFilters)"
      @reset-filters="
        (newFilters) => {
          search = '';
          updateFilters(newFilters);
        }
      "
    />
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import ContentLayout from '../components/layout/ContentLayout.vue';
import SingleChipVue from '../components/chip/SingleChip.vue';
import { useUserStore } from '../stores/user';
import { useGlobalStore } from '../stores/global';
import { AdminFilters, FilteredUser, RoleEnum, UserFilters } from '../types';
import AdminFilterModal from '../components/filters/AdminFilterModal.vue';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const headers = reactive([
  'Email',
  'Imię',
  'Nazwisko',
  'Rola',
  'Aktywne Konto',
  'Akcje',
]);
let currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const adminFiltersModal = ref(false);
const roles = reactive([
  { text: 'Wszystkie', value: null },
  { text: 'Student', value: RoleEnum.STUDENT },
  { text: 'HR', value: RoleEnum.HR },
  { text: 'Administrator', value: RoleEnum.ADMIN },
]);
const search = ref('');
let filters = reactive<AdminFilters>({
  search: '',
  permission: {
    text: 'Wszystkie',
    value: null,
  },
  accountBlocked: null,
  sortDirection: false,
  sortTarget: 'accountBlocked',
});

const targerUser = ref({});

getDataTable();

function changePage(value: number) {
  currentPage.value = value;
  getDataTable();
}

function getDataTable() {
  filters.search = search.value;
  userStore
    .getAllUsersData(currentPage.value, limit.value, filters)
    .then((value) => {
      if (value) total.value = value;
    });
}

async function updateFilters(newFilters: UserFilters) {
  currentPage.value = 1;
  filters = newFilters;
  await getDataTable();
  adminFiltersModal.value = false;
}

watch(limit, async () => {
  currentPage.value = 1;
  await getDataTable();
});

watch(search, () => {
  filters.search = search.value;
});

function showBlockUserDialog(user: FilteredUser) {
  console.log(user);
}
</script>

<style>
.add-button {
  background-color: #e02735;
  padding: 5px;
}
.add-button:hover {
  background-color: #e4404e;
}

.filter-button {
  background-color: #1e1e1f;
  padding: 7px 3px;
}

.filter-button-icon {
  color: #4d4d4d;
}

.filter-input-icon-color {
  color: #666666;
}
.filter-input-icon-color::placeholder {
  color: #666666;
}

.arrow-pag {
  background-color: #666666;
  color: #333333;
}

.arrow-pag-active {
  background-color: #cfcfcf;
  color: #333333;
}
</style>
