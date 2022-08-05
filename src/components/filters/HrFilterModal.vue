<template>
  <div class="fixed inset-0 filter-bg transition-opacity"></div>
  <div class="fixed mt-16 w-1/3 p-3 filter-container">
    <div>
      <div class="flex justify-between mt-3 mb-4">
        <h2 class="font-bold">Filtrowanie</h2>
        <button class="btn-clear" @click="resetFilter()">
          Wyczyść wszystkie
        </button>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1">Ocena przejścia kursu</span>
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center dark-bgc m-1 p-1 text-xs cursor-pointer"
            v-for="index in 5"
            :class="{
              active: filters.courseCompletion.filter((v: number) => v === index)
                .length,
            }"
            @click="
              updateTableWithObjects <
                number >
                (index, filters.courseCompletion)
            "
          >
            <span>{{ index }}</span>
            <mdicon
              :class="{
                active: filters.courseCompletion.filter((v: number) => v === index)
                  .length,
              }"
              class="ml-1 text-red-500"
              size="16"
              name="star"
            ></mdicon>
          </div>
        </div>
      </div>
      <div class="grid mb-4">
        <span class="text-sm mb-1"
          >Ocena aktywności i zaangażowania w kursie</span
        >
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center dark-bgc m-1 p-1 text-xs cursor-pointer"
            v-for="index in 5"
            :class="{
              active: filters.courseEngagement.filter((v: number) => v === index).length,
            }"
            @click="
              updateTableWithObjects <
                number >
                (index, filters.courseEngagement)
            "
          >
            <span>{{ index }}</span>
            <mdicon
              :class="{
                active: filters.courseEngagement.filter((v: number) => v === index).length,
              }"
              class="ml-1 text-red-500"
              size="16"
              name="star"
            ></mdicon>
          </div>
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1">Ocena kodu w projekcie własnym</span>
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center dark-bgc m-1 p-1 text-xs cursor-pointer"
            v-for="index in 5"
            :class="{
              active: filters.projectDegree.filter((v: number) => v === index).length,
            }"
            @click="
              updateTableWithObjects < number > (index, filters.projectDegree)
            "
          >
            <span>{{ index }}</span>
            <mdicon
              :class="{
                active: filters.projectDegree.filter((v: number) => v === index).length,
              }"
              class="ml-1 text-red-500"
              size="16"
              name="star"
            ></mdicon>
          </div>
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1">Ocena pracy w zespole Scrum</span>
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center dark-bgc m-1 p-1 text-xs cursor-pointer"
            v-for="index in 5"
            :class="{
              active: filters.teamProjectDegree.filter((v: number) => v === index).length,
            }"
            @click="
              updateTableWithObjects <
                number >
                (index, filters.teamProjectDegree)
            "
          >
            <span>{{ index }}</span>
            <mdicon
              :class="{
                active: filters.teamProjectDegree.filter((v: number) => v === index).length,
              }"
              class="ml-1 text-red-500"
              size="16"
              name="star"
            ></mdicon>
          </div>
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1">Preferowane miejsce pracy</span>
        <div class="flex w-fit">
          <div
            class="flex items-center dark-bgc m-1 p-1 text-xs cursor-pointer"
            v-for="place in expectedTypeWork"
            :class="{
              active: filters.expectedTypeWork.filter((v: ExpectedTypeWorkEnum) => v === place.value)
                .length,
            }"
            @click="
              updateTableWithObjects <
                ExpectedTypeWorkEnum >
                (place.value, filters.expectedTypeWork)
            "
          >
            <span>{{ place.text }}</span>
          </div>
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1">Oczekiwany typ kontraktu</span>
        <div class="flex w-fit">
          <div
            class="flex items-center dark-bgc m-1 p-1 text-xs cursor-pointer"
            v-for="contract in expectedContractType"
            :class="{
              active: filters.expectedContractType.filter((v: ExpectedContractTypeEnum) => v === contract.value)
                .length,
            }"
            @click="
              updateTableWithObjects <
                ExpectedContractTypeEnum >
                (contract.value, filters.expectedContractType)
            "
          >
            <span>{{ contract.text }}</span>
          </div>
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-2">Oczekiwane wynagrodzenie</span>
        <div class="flex w-fit text-sm items-center">
          <span class="mr-2">Od</span>
          <input
            class="dark-bgc p-1 mr-2"
            type="number"
            placeholder="np. 1000 zł"
            v-model="filters.minSalary"
          />
          <span class="mr-2">Do</span>
          <input
            class="dark-bgc p-1"
            type="number"
            placeholder="np. 10000 zł"
            v-model="filters.maxSalary"
          />
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-2"
          >Zgoda na odbycie bezpłatnych praktyk/stażu na początek</span
        >
        <div class="grid w-fit text-sm">
          <div v-for="option in chooseYesOrNo" class="flex items-center mb-1">
            <input
              class="mr-2"
              type="radio"
              :value="option.value"
              v-model="filters.canTakeApprenticeship"
            />
            <span>{{ option.text }}</span>
          </div>
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-2"
          >Ilośc miesięcy doświadczenia komercyjnego kandydata w
          programowaniu</span
        >
        <div class="grid text-sm">
          <div class="flex items-center mb-1">
            <input
              class="mr-2 dark-bgc p-1 pl-1"
              type="number"
              placeholder="0 miesięcy"
              v-model="filters.monthsOfCommercialExp"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end text-sm mt-5">
        <button class="mr-5 p-1" @click="emit('closeModal')">Anuluj</button>
        <button class="add-button p-2" @click="emit('search-filters', filters)">
          Pokaż wyniki
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import {
  ExpectedContractTypeEnum,
  ExpectedTypeWorkEnum,
  HrFilters,
} from '../../types';

const emit = defineEmits(['search-filters', 'closeModal', 'reset-filters']);
const props = defineProps(['filters', 'searchValue']);

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

const expectedTypeWork = reactive([
  {
    text: 'Praca zdalna',
    value: ExpectedTypeWorkEnum['ONLY REMOTELY'],
  },
  { text: 'Praca w biurze', value: ExpectedTypeWorkEnum['AT LOCATION'] },
]);

const expectedContractType = reactive([
  {
    text: 'Umowa o pracę',
    value: ExpectedContractTypeEnum['ONLY EMPLOYMENT CONTRACT'],
  },
  {
    text: 'B2B',
    value: ExpectedContractTypeEnum['POSSIBLE B2B'],
  },
  {
    text: 'Umowa zlecenie / Umowa o dzieło',
    value: ExpectedContractTypeEnum['POSSIBLE MANDATE CONTRACT/CONTRACT WORK'],
  },
]);

const chooseYesOrNo = reactive([
  { text: 'Tak', value: true },
  { text: 'Nie', value: false },
]);

function resetFilter() {
  (filters.search = ''),
    (filters.courseCompletion = []),
    (filters.courseEngagement = []),
    (filters.projectDegree = []),
    (filters.teamProjectDegree = []),
    (filters.expectedTypeWork = []),
    (filters.expectedContractType = []),
    (filters.minSalary = null),
    (filters.maxSalary = null),
    (filters.canTakeApprenticeship = null),
    (filters.monthsOfCommercialExp = null),
    emit('reset-filters', filters);
}

function updateTableWithObjects<T>(value: T, array: T[]) {
  if (!array.filter((item) => item === value).length) array.push(value);
  else {
    for (const [index, item] of array.entries()) {
      if (item === value) array.splice(index, 1);
    }
  }
}

filters = props.filters;
</script>

<style scoped>
.active {
  background-color: red;
  color: white !important;
}
</style>
