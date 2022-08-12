<template>
  <div class="bg-[#292a2b]">
    <div class="bg-[#292a2b] p-2 grid mt-2">
      <div class="p-5 mb-10 flex items-center gap-20">
        <span class="font-bold text-4xl">{{
          type === 'register' ? 'Rejestracja' : 'Twoje Dane'
        }}</span>

        <div v-if="type !== 'register'">
          <span class="font-bold text-xl mr-3">Twój Aktualny Status:</span>
          <span class="font-bold p-2 border text-blue-400"
            >{{ translator(editedUser.studentStatus) }}
          </span>
        </div>
      </div>

      <form class="grid grid-cols-5 justify-items-center">
        <div>
          <span class="p-3 uppercase underline font-bold">Dane Podstawowe</span>
          <div class="flex-form">
            <label for="email"> Email </label>
            <input
              disabled
              id="email"
              class="edit-data-input"
              v-model="editedUser.email"
              placeholder="Email"
              type="email"
            />
            <span v-if="v$register.email.$error" class="valid">{{
              v$register.email.$errors[0].$message
            }}</span>
            <span v-if="v$update.email.$error" class="valid">{{
              v$update.email.$errors[0].$message
            }}</span>
          </div>
          <div class="flex-form" v-if="type === 'register'">
            <label for="password"> Hasło </label>
            <input
              id="password"
              class="edit-data-input"
              v-model="editedUser.password"
              placeholder="Hasło"
              type="password"
            />
            <span v-if="v$register.password.$error" class="ml-5 valid mt-2">{{
              v$register.password.$errors[0].$message
            }}</span>
          </div>
          <div class="flex-form" v-if="type === 'register'">
            <label for="confirmPassword" class="">Potwierdź Hasło </label>
            <input
              id="confirmPassword"
              class="edit-data-input"
              v-model="editedUser.confirmPassword"
              placeholder="Potwierdź Hasło"
              type="password"
            />
            <span v-if="v$register.confirmPassword.$error" class="valid mt-2">{{
              v$register.confirmPassword.$errors[0].$message
            }}</span>
          </div>
          <div class="flex-form">
            <label for="name"> Imię </label>
            <input
              id="firstName"
              class="edit-data-input"
              v-model="editedUser.firstName"
              placeholder="Imię"
              type="text"
            />
            <span v-if="v$register.firstName.$error" class="valid">{{
              v$register.firstName.$errors[0].$message
            }}</span>
            <span v-if="v$update.firstName.$error" class="valid">{{
              v$update.firstName.$errors[0].$message
            }}</span>
          </div>
          <div class="flex-form">
            <label for="lastName"> Nazwisko </label>
            <input
              id="lastName"
              class="edit-data-input"
              v-model="editedUser.lastName"
              placeholder="Nazwisko"
              type="text"
            />
            <span v-if="v$register.lastName.$error" class="valid">{{
              v$register.lastName.$errors[0].$message
            }}</span>
            <span v-if="v$update.lastName.$error" class="valid">{{
              v$update.lastName.$errors[0].$message
            }}</span>
          </div>
          <div class="flex-form">
            <label for="phoneNumber"> Numer Telefonu </label>
            <input
              id="phoneNumber"
              class="edit-data-input"
              v-model="editedUser.phoneNumber"
              placeholder="Numer Telefonu"
              type="tel"
            />
          </div>
        </div>
        <div>
          <span class="p-3 uppercase underline font-bold"
            >Dane Dotyczące Zatrudnienia</span
          >
          <div class="flex-form">
            <label for="targetWorkCity"> Preferowane Miasto </label>
            <input
              id="targetWorkCity"
              class="bg-[#1e1e1f] px-1 py-1"
              v-model="editedUser.targetWorkCity"
              placeholder="Miasto"
              type="text"
            />
          </div>
          <div class="flex-form">
            <label for="expectedTypeWork"> Preferowany tryb pracy </label>
            <select v-model="editedUser.expectedTypeWork" class="bg-[#1e1e1f] p-1">
              <option :value="option.value" v-for="option in ExpectedTypeWork">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="flex-form">
            <label for="expectedContractType"> Preferowany rodzaj umowy </label>
            <select
              v-model="editedUser.expectedContractType"
              class="bg-[#1e1e1f] p-1"
            >
              <option
                :value="option.value"
                v-for="option in ExpectedContractType"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="flex-form">
            <label for="expectedSalary"> Wynagrodzenie </label>
            <input
              id="expectedSalary"
              class="edit-data-input"
              v-model="editedUser.expectedSalary"
              placeholder="Kwota Netto"
              type="number"
            />
          </div>
          <div class="flex-form">
            <label for="monthsOfCommercialExp">
              Ilość miesięcy doświadczenia komercyjnego
            </label>
            <input
              id="monthsOfCommercialExp"
              class="edit-data-input"
              v-model="editedUser.monthsOfCommercialExp"
              placeholder="Ilość Miesięcy"
              type="number"
            />
          </div>
          <div class="flex-form">
            <label for="canTakeApprenticeship">
              Zgodę na odbycie bezpłatnego stażu ?
            </label>
            <select
              v-model="editedUser.canTakeApprenticeship"
              class="bg-[#1e1e1f] p-1"
            >
              <option :value="option.value" v-for="option in confirm">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <span class="p-3 uppercase underline font-bold">INFORMACJE</span>
          <div class="flex-form">
            <label for="bio"> Bio </label>
            <textarea
              id="bio"
              class="edit-data-input"
              v-model="editedUser.bio"
              placeholder="Bio"
            ></textarea>
          </div>
          <div class="flex-form">
            <label for="education"> Wykształcenie </label>
            <textarea
              id="education"
              class="edit-data-input"
              v-model="editedUser.education"
              placeholder="Wykształcenie"
            ></textarea>
          </div>
          <div class="flex-form">
            <label for="workExperience"> Doświadczenie Zawodowe </label>
            <textarea
              id="workExperience"
              class="edit-data-input"
              v-model="editedUser.workExperience"
              placeholder="Doświadczenie Zawodowe"
            ></textarea>
          </div>
          <div class="flex-form">
            <label for="courses">
              Kursy i certyfikaty związane z programowaniem
            </label>
            <textarea
              id="courses"
              class="edit-data-input"
              v-model="editedUser.courses"
              placeholder="Kursy i certyfikaty"
            ></textarea>
          </div>
        </div>
        <div>
          <span class="p-3 uppercase underline font-bold">Oceny</span>
          <div class="flex-form">
            <label for="courseCompletion">
              Ocena stopnia przejścia kursu
            </label>
            <input
              disabled
              id="courseCompletion"
              class="px-1 py-1"
              v-model="editedUser.courseCompletion"
              placeholder="Ocena w zakresie 0 - 5."
              type="number"
            />
          </div>
          <div class="flex-form">
            <label for="courseEngagement">
              Ocena stopnia aktywności i zaangażowania w kursie
            </label>
            <input
              disabled
              id="courseEngagement"
              class="px-1 py-1"
              v-model="editedUser.courseEngagement"
              placeholder="Ocena w zakresie 0 - 5."
              type="number"
            />
          </div>
          <div class="flex-form">
            <label for="projectDegree">
              Ocena zadania zaliczeniowego w kursie
            </label>
            <input
              disabled
              id="projectDegree"
              class="px-1 py-1"
              v-model="editedUser.projectDegree"
              placeholder="Ocena w zakresie 0 - 5."
              type="number"
            />
          </div>
          <div class="flex-form">
            <label for="teamProjectDegree">
              Ocena pracy w zespole w projekcie bonusowym
            </label>
            <input
              disabled
              id="teamProjectDegree"
              class="px-1 py-1"
              v-model="editedUser.teamProjectDegree"
              placeholder="Ocena w zakresie 0 - 5."
              type="number"
            />
          </div>
        </div>
        <div>
          <span class="p-3 uppercase underline font-bold">Linki</span>
          <div class="flex-form">
            <label for="githubUsername"> Nazwa na GitHub </label>
            <input
              id="githubUsername"
              class="edit-data-input"
              v-model="editedUser.githubUsername"
              placeholder="Nick"
              type="text"
            />
          </div>

          <div class="flex-form">
            <label for="portfolioUrls"> Linki do portfolio </label>
            <textarea
              id="portfolioUrls"
              class="edit-data-input"
              v-model="editedUser.portfolioUrls"
              placeholder="Linki oddzielone ','"
            ></textarea>
          </div>
          <div class="flex-form">
            <label for="projectUrls"> Linki do projektów </label>
            <textarea
              id="projectUrls"
              class="edit-data-input"
              v-model="editedUser.projectUrls"
              placeholder="Linki oddzielone ','"
            >
            </textarea>
          </div>
          <div class="flex-form">
            <label for="bonusProjectUrls"> URL-e do GitHuba. </label>
            <textarea
              id="bonusProjectUrls"
              class="edit-data-input"
              v-model="editedUser.bonusProjectUrls"
              placeholder="Linki oddzielone ','"
            ></textarea>
          </div>
        </div>
      </form>
      <div class="flex justify-center mb-10 gap-10">
        <button
          v-if="type === 'register'"
          @click.prevent="confirmRegister()"
          class="add-button px-32 pb-2 mt-2"
        >
          Potwierdź Rejestracje
        </button>
        <div v-if="type !== 'register'" class="flex gap-10">
          <button
            @click.prevent="saveData()"
            class="add-button px-32 pb-2 mt-2"
          >
            Zapisz
          </button>
          <button
            @click.prevent="confirmDialog = true"
            class="add-button px-32 pb-2 mt-2"
          >
            Znalazłem Prace
          </button>
        </div>
      </div>
    </div>
  </div>
  <StudentConfirmDialog
    @confirmAndCloseDialog="confirmAndCloseAccount()"
    @closeDialog="confirmDialog = false"
    v-if="confirmDialog"
  />
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import {
  required,
  email,
  helpers,
  minLength,
  sameAs,
} from '@vuelidate/validators';
import { useUserStore } from '../../stores/user.js';
import StudentConfirmDialog from './StudentConfirmDialog.vue';
import useVuelidate from '@vuelidate/core';
import { translator } from '../../components/dictionary/dictionary';

const props = defineProps(['user', 'type']);
const userStore = useUserStore();

const confirmDialog = ref(false);

const confirm = reactive([
  { text: 'Tak', value: true },
  { text: 'Nie', value: false },
]);

const ExpectedTypeWork = reactive([
  { text: 'Na miejscu', value: 'AT LOCATION' },
  { text: 'Gotowość do przeprowadzki', value: 'WILLINGNESS TO RELOCATE' },
  { text: 'Wyłącznie zdalnie', value: 'ONLY REMOTELY' },
  { text: 'Hybrydowo', value: 'HYBRID' },
  { text: 'Bez znaczenia', value: 'IRRELEVANT' },
]);

const ExpectedContractType = reactive([
  { text: 'Tylko UoP', value: 'ONLY EMPLOYMENT CONTRACT' },
  { text: 'Możliwe B2B', value: 'POSSIBLE B2B' },
  {
    text: 'Możliwe UZ/UoD',
    value: 'POSSIBLE MANDATE CONTRACT/CONTRACT WORK',
  },
  { text: 'Brak preferencji ', value: 'NO PREFERENCES' },
]);

const editedUser = reactive(Object.assign({}, props.user));
if (props.type === 'register') {
  editedUser.expectedTypeWork = 'IRRELEVANT';
  editedUser.expectedContractType = 'NO PREFERENCES';
  editedUser.canTakeApprenticeship = false;
}

const rulesRegister = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      email: helpers.withMessage('Email musi być poprawny!', email),
    },
    firstName: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
    lastName: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
    password: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      minLength: helpers.withMessage(
        'Hasło musi mieć minimum 6 znaków!',
        minLength(6),
      ),
    },
    confirmPassword: {
      sameAs: helpers.withMessage(
        'Hasła muszą być takie same',
        sameAs(editedUser.password),
      ),
    },
  };
});

const rulesUpdate = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Pole nie może być puste!', required),
      email: helpers.withMessage('Email musi być poprawny!', email),
    },
    firstName: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
    lastName: {
      required: helpers.withMessage('Pole nie może być puste!', required),
    },
  };
});

const v$register = useVuelidate(rulesRegister, editedUser);
const v$update = useVuelidate(rulesUpdate, editedUser);

function confirmAndCloseAccount() {
  userStore.closeUserAccount(props.user.id);
  confirmDialog.value = false;
}
async function confirmRegister() {
  if (await v$register.value.$validate()) {
    userStore.confirmRegister(editedUser);
  }
}

async function saveData() {
  if (await v$update.value.$validate()) {
    editedUser.bonusProjectUrls =
      typeof editedUser.bonusProjectUrls === 'string'
        ? editedUser.bonusProjectUrls.split(',')
        : editedUser.bonusProjectUrls;

    editedUser.portfolioUrls =
      typeof editedUser.portfolioUrls === 'string'
        ? editedUser.portfolioUrls.split(',')
        : editedUser.portfolioUrls;

    editedUser.projectUrls =
      typeof editedUser.projectUrls === 'string'
        ? editedUser.projectUrls.split(',')
        : editedUser.projectUrls;

    userStore.updateUserData(editedUser);
  }
}
</script>
