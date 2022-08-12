<template>
  <div class="flex-center mt-1 bg-[#292a2b]">
    <div class="p-3 flex justify-between w-full">
      <div class="relative rounded w-1/4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <mdicon class="text-[#666666]" name="magnify" />
        </span>
        <button
          v-if="search.length > 0"
          class="absolute inset-y-0 right-1 flex items-center pl-2"
          @click="
            search = '';
            getDataTable();
          "
        >
          <mdicon
            class="text-[#666666] hover:text-gray-300"
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
          @click="adminFiltersModal = true"
        >
          <mdicon class="text-[#4d4d4d]" name="filter"></mdicon>
          <span class="mr-2 leading-7 text-base">Filtrowanie</span>
        </button>
      </div>
    </div>
  </div>
  <div class="flex mt-4 bg-[#292a2b]">
    <table class="m-3 w-full table-auto text-sm text-left">
      <thead class="text-xs bg-[#1e1e1f]">
        <tr>
          <th class="py-3 px-3" v-for="header in headers">
            <div class="flex justify-between items-center">
              {{ header }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-4 border-[#1e1e1f] " v-for="user in userStore.userList">
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
            {{ user.permission }}
          </td>
          <td class="td-row uppercase font-bold">
            {{ user.accountBlocked === true ? 'Nie' : 'Tak' }}
          </td>
          <td>
            <button
              class="pointer transition relative group ml-2"
              @click="showChangePasswordForTargetUserModal(user)"
            >
              <mdicon
                name="lock-reset"
                class="relative text-yellow-400 hover:text-yellow-300"
              >
              </mdicon>
              <div
                class="group-hover:visible invisible transition duration-700 hover:duration-450 ease-in-out opacity-0 group-hover:opacity-100 text-xs absolute bg-gray-700 px-2 py-1 bg-opacity-75 cursor-auto right-7 -bottom-2 z-50"
              >
                Zmień Hasło
              </div>
            </button>
            <button
              class="pointer transition relative group ml-2"
              @click="showBlockTargetUserModal(user)"
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
  <BlockTargetUserModal
    :user="targerUser"
    v-if="blockTargetUserModal"
    @closeBlockDialog="blockTargetUserModal = false"
    @blockUserAndCloseDialog="(user: FilteredUser) => {
        blockTargerUser(user)
      }"
  />
  <ChangePasswordForTargetUserModal
    @changeUserPasswordAndCloseDialog="(user: FilteredUser, password: string) => {
        changePasswordForTargetUser(user, password)}"
    @closeChangeUserPasswordDialog="changePasswordForTargerUserModal = false"
    :user="targerUser"
    v-if="changePasswordForTargerUserModal"
  />
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
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import AdminFilterModal from '../../components/filters/AdminFilterModal.vue';
import BlockTargetUserModal from '../../components/modals/user/BlockTargetUserModal.vue';
import ChangePasswordForTargetUserModal from '../../components/modals/user/ChangePasswordForTargetUserModal.vue';
import { calcItemsInPag } from '../../components/pagination/calcItemsInPag';
import { useGlobalStore } from '../../stores/global';
import { useUserStore } from '../../stores/user';
import {
  RoleEnum,
  AdminFilters,
  UserFilters,
  FilteredUser,
} from '../../types';

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
const blockTargetUserModal = ref(false);
const changePasswordForTargerUserModal = ref(false);
const itemsInPage = ref(0);
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

let targerUser = ref({});

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
      total.value = value ? value : 0;
      itemsInPage.value = calcItemsInPag(
        limit.value,
        total.value,
        currentPage.value,
        userStore.userList.length,
      );
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

function showBlockTargetUserModal(user: FilteredUser) {
  targerUser.value = user;

  blockTargetUserModal.value = true;
}
function showChangePasswordForTargetUserModal(user: FilteredUser) {
  targerUser.value = user;
  changePasswordForTargerUserModal.value = true;
}

async function blockTargerUser(user: FilteredUser) {
  await userStore.blockTargetUser(user.id);
  await getDataTable();
  blockTargetUserModal.value = false;
}

async function changePasswordForTargetUser(
  user: FilteredUser,
  password: string,
) {
  const payload = {
    password,
  };
  await userStore.changePasswordForTargetUser(user.id, payload);
  await getDataTable();
  changePasswordForTargerUserModal.value = false;
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
</script>
