<template>
  <div class="fixed inset-0 filter-bg transition-opacity"></div>
  <div class="fixed mt-16 w-1/3 max-w-[520px] p-5 filter-container">
    <div>
      <div class="flex justify-between mt-3 mb-4">
        <h2 class="text-2xl font-bold">Filtrowanie</h2>
        <button class="hover:bg-[#2a3a44] bg-[#172A35] py-1 px-2.5 text-[#F7F7F7] font-medium text-sm" @click="resetFilter()">

          Wyczyść wszystkie
        </button>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1.5 font-medium">Ocena przejścia kursu</span>
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center mr-2 py-1.5 px-2 text-xs cursor-pointer bg-[#292a2b] transition ease-out duration-300"
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
              class="ml-1 text-red-500 transition ease-out duration-300"
              size="16"
              name="star"
            ></mdicon>
          </div>
        </div>
      </div>
      <div class="grid mb-4">
        <span class="text-sm mb-1.5 font-medium"
          >Ocena aktywności i zaangażowania na kursie</span
        >
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center mr-2 py-1.5 px-2 text-xs cursor-pointer bg-[#292a2b] transition ease-out duration-300"
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
        <span class="text-sm mb-1.5 font-medium">Ocena kodu w projekcie własnym</span>
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center mr-2 py-1.5 px-2 text-xs cursor-pointer bg-[#292a2b] transition ease-out duration-300"
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
        <span class="text-sm mb-1.5 font-medium">Ocena pracy w zespole Scrum</span>
        <div class="flex flex-row-reverse w-fit">
          <div
            class="flex items-center mr-2 py-1.5 px-2 text-xs cursor-pointer bg-[#292a2b] transition ease-out duration-300"
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
        <span class="text-sm mb-1.5 font-medium">Preferowane miejsce pracy</span>
        <div class="flex w-fit">
          <div
            class="flex items-center mr-2 py-1.5 px-2 text-xs cursor-pointer bg-[#292a2b] transition ease-out duration-300"
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
        <span class="text-sm mb-1.5 font-medium">Oczekiwany typ kontraktu</span>
        <div class="flex w-fit">
          <div
            class="flex items-center mr-2 py-1.5 px-2 text-xs cursor-pointer bg-[#292a2b] transition ease-out duration-300"
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
        <span class="text-sm mb-1.5 font-medium">Oczekiwane wynagrodzenie miesięcznie netto</span>
        <div class="flex w-fit text-sm items-center">
          <span class="mr-2 mr-2 text-xs">Od</span>
          <input
            class="mr-3 placeholder:text-xs placeholder:text-[#7E7E7E] p-1.5 w-1/4 bg-[#292A2B] h-7"
            type="number"
            placeholder="np. 1000 zł"
            v-model="filters.minSalary"
          />
          <span class="mr-2 mr-2 text-xs">Do</span>
          <input
            class="placeholder:text-xs placeholder:text-[#7E7E7E] p-1.5 w-1/4 bg-[#292A2B] h-7"
            type="number"
            placeholder="np. 10000 zł"
            v-model="filters.maxSalary"
          />
        </div>
      </div>

      <div class="grid mb-4">
        <span class="text-sm mb-1.5 font-medium"
          >Zgoda na odbycie bezpłatnych praktyk/stażu na początek</span
        >
        <div class="grid w-fit text-sm">
          <div v-for="option in chooseYesOrNo" class="flex items-center mb-1 font-medium">
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
        <span class="text-sm mb-1.5 font-medium"
          >Ilość miesięcy doświadczenia komercyjnego kandydata w
          programowaniu</span
        >
        <div class="grid text-sm">
          <div class="flex items-center mb-1">
            <input
              class="bg-[#292a2b] p-1 pl-2 placeholder:text-xs w-1/4"
              type="number"
              placeholder="0 miesięcy"
              v-model="filters.monthsOfCommercialExp"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end text-sm mt-5">
        <button class="mr-5 p-1 text-base" @click="emit('closeModal')">Anuluj</button>
        <button class="bg-[#E02735] px-2.5 py-1.5 text-base" @click="emit('search-filters', filters)">
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
