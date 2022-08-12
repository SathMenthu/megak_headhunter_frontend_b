<template>
  <div class="fixed inset-0 bg-[#1e1e1f] opacity-80 transition-opacity"></div>
  <div class="fixed w-1/4 p-3 filter-container">
    <div>
      <div class="flex justify-between mb-4">
        <h2 class="font-bold">Filtrowanie</h2>
        <button class="btn-clear" @click="resetFilter()">
          Wyczyść wszystkie
        </button>
      </div>

      <div class="grid place-items-start gap-1 text-sm">
        <span>Rola</span>
        <select v-model="filters.permission" class="bg-[#292a2b] p-1">
          <option :value="role" v-for="role in roles">
            {{ role.text }}
          </option>
        </select>

        <span>Czy konta jest zablokowane ?</span>
        <div>
          <input
            id="test"
            class=""
            type="radio"
            v-model="filters.accountBlocked"
            :value="true"
          />

          <span>Tak</span>
        </div>
        <div>
          <input type="radio" v-model="filters.accountBlocked" :value="false" />
          <span>Nie</span>
        </div>

        <span>Kierunek Sortowania</span>
        <select v-model="filters.sortDirection" class="bg-[#292a2b] p-1">
          <option :value="option.value" v-for="option in sortDirectionOptions">
            {{ option.text }}
          </option>
        </select>

        <span>Sortowanie po</span>
        <select v-model="filters.sortTarget" class="bg-[#292a2b] p-1">
          <option :value="option.value" v-for="option in sortTargets">
            {{ option.text }}
          </option>
        </select>
      </div>

      <div class="flex justify-end text-sm mt-5">
        <button class="mr-5 p-1" @click="emit('closeModal')">Anuluj</button>
        <button class="add-button" @click="emit('search-filters', filters)">
          Pokaż wyniki
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { AdminFilters } from '../../types';

const emit = defineEmits(['search-filters', 'closeModal', 'reset-filters']);
const props = defineProps(['roles', 'filters', 'searchValue']);
let filters = reactive<Partial<AdminFilters>>({
  permission: {
    text: 'Wszystkie',
    value: null,
  },
  accountBlocked: null,
  sortDirection: false,
  sortTarget: 'accountBlocked',
});

const sortDirectionOptions = reactive([
  { text: 'Rosnąco', value: false },
  { text: 'Malejąco', value: true },
]);

const sortTargets = reactive([
  { text: 'Aktywne Konto', value: 'accountBlocked' },
  { text: 'Email', value: 'email' },
  { text: 'Imię', value: 'firstName' },
  { text: 'Nazwisko', value: 'lastName' },
]);

function resetFilter() {
  filters.accountBlocked = null;
  filters.permission = {
    text: 'Wszystkie',
    value: null,
  };
  (filters.sortDirection = false),
    (filters.sortTarget = 'email'),
    emit('reset-filters', filters);
}

filters = props.filters;
</script>
