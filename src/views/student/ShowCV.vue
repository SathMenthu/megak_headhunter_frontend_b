<template>
  <div class="flex ml-40 text-xs">
    <button
      class="flex pt-7 h-fit items-center"
      @click="router.push('hr-dashboard')"
    >
      <mdicon class="font-bold header" size="32" name="chevron-left"></mdicon>
      <span class="font-bold cursor-pointer">Wróć</span>
    </button>
    <div class="ml-5 mr-16">
      <div class="grid grid-cols-12 gap-4 pt-7">
        <div
          class="h-fit card flex flex-col col-span-2 justify-center items-center"
        >
          <img
            :src="user?.avatar"
            class="w-40 h-40 py-2 px-2 rounded-full mt-5"
          />
          <span class="text-2xl mt-2 mb-2"
            >{{ user.firstName }} {{ user.lastName }}</span
          >
          <button class="flex text-blue-500 mb-6">
            <mdicon class="mr-1" name="github"></mdicon
            ><a
              target="_blank"
              :href="`https://github.com/${user.githubUsername}/`"
              >{{ user.githubUsername }}</a
            >
          </button>

          <div class="flex w-full">
            <mdicon class="mx-4" name="phone"></mdicon>
            <span
              >+48 {{ user.phoneNumber?.toString().slice(0, 3) }}
              {{ user.phoneNumber?.toString().slice(3, 6) }}
              {{ user.phoneNumber?.toString().slice(6, 9) }}</span
            >
          </div>
          <div class="flex w-full mt-4 mb-5 text-xs">
            <mdicon class="mx-4" name="mail"> </mdicon>
            <span> {{ user.email }}</span>
          </div>

          <span class="ml-6 w-full text-left text-sm header font-bold"
            >O mnie</span
          >

          <span class="mx-4">
            {{ user.bio }}
          </span>

          <div class="mx-4 mt-8">
            <button @click="UnreserveStudent()" class="add-button w-full mb-4">
              Brak Zainteresowania
            </button>
            <button @click="HireStudent()" class="add-button w-full mb-6">
              Zatrudniony
            </button>
          </div>
        </div>
        <div class="col-span-10 mb-8">
          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4">Oceny</span>
            </div>
            <div class="flex">
              <div class="flex">
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Ocena przejścia kursu</span
                  >
                  <div class="mt-4 flex items-center">
                    <span class="font-bold"
                      >{{ user.courseCompletion || '- ' }}
                    </span>
                    <span class="rating-range mr-2 ml-2"> / 5</span>

                    <mdicon
                      v-for="index in user.courseCompletion"
                      class="text-red-500"
                      size="22"
                      name="star"
                    ></mdicon>
                    <mdicon
                      v-if="user.courseCompletion"
                      v-for="index in 5 - user?.courseCompletion"
                      size="22"
                      name="star"
                    ></mdicon>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Ocena aktywności i zaangażowanie w kursie</span
                  >
                  <div class="mt-4 flex items-center">
                    <span class="font-bold"
                      >{{ user.courseEngagement || '- ' }}
                    </span>
                    <span class="rating-range mr-2 ml-2"> / 5</span>

                    <mdicon
                      v-for="index in user.courseEngagement"
                      class="text-red-500"
                      size="22"
                      name="star"
                    ></mdicon>
                    <mdicon
                      v-if="user.courseEngagement"
                      v-for="index in 5 - user?.courseEngagement"
                      size="22"
                      name="star"
                    ></mdicon>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Ocena kodu w projekcie własnym</span
                  >
                  <div class="mt-4 flex items-center">
                    <span class="font-bold"
                      >{{ user.projectDegree || '- ' }}
                    </span>
                    <span class="rating-range mr-2 ml-2"> / 5</span>

                    <mdicon
                      v-for="index in user.projectDegree"
                      class="text-red-500"
                      size="22"
                      name="star"
                    ></mdicon>
                    <mdicon
                      v-if="user?.projectDegree"
                      v-for="index in 5 - user?.projectDegree"
                      size="22"
                      name="star"
                    ></mdicon>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Ocena pracy w zespole w Scrum</span
                  >
                  <div class="mt-4 flex items-center">
                    <span class="font-bold"
                      >{{ user.teamProjectDegree || '- ' }}
                    </span>
                    <span class="rating-range mr-2 ml-2"> / 5</span>

                    <mdicon
                      v-for="index in user.teamProjectDegree"
                      class="text-red-500"
                      size="22"
                      name="star"
                    ></mdicon>
                    <mdicon
                      v-if="user?.teamProjectDegree"
                      v-for="index in 5 - user?.teamProjectDegree"
                      size="22"
                      name="star"
                    ></mdicon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4"
                >Oczekiwanie w stosunku do zatrudnienia</span
              >
            </div>
            <div class="flex content-cv">
              <div class="flex">
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Preferowane miejsce pracy</span
                  >
                  <div class="mt-4 flex">
                    <span class="text-sm font-bold">{{
                      translator(user.expectedTypeWork)
                    }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Docelowe miasto, gdzie chce pracować kandydat</span
                  >
                  <div class="mt-4 flex">
                    <span class="text-sm font-bold">{{
                      user.targetWorkCity
                    }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Oczekiwany typ kontraktu</span
                  >
                  <div class="mt-4 flex">
                    <span class="text-sm font-bold">{{
                      translator(user.expectedContractType)
                    }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Oczekiwane wynagrodzenie miesięczne netto</span
                  >
                  <div class="mt-4 flex">
                    <span class="text-sm font-bold">{{
                      user.expectedSalary ? user.expectedSalary + ' zł' : 'brak'
                    }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Zgoda na odbycie bezpłatnych praktyk/stażu na
                    początek</span
                  >
                  <div class="mt-4 flex">
                    <span class="text-sm font-bold uppercase">{{
                      user.canTakeApprenticeship ? 'tak' : 'nie'
                    }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <span class="text-sm font-bold header"
                    >Komercyjne doświadczenie w programowaniu</span
                  >
                  <div class="mt-4 flex">
                    <span class="text-sm font-bold uppercase">
                      {{ calcUserExp(user.monthsOfCommercialExp) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4">Edukacja</span>
            </div>
            <div class="flex content-cv">
              <div class="flex">
                <div class="p-5">
                  <span>{{ user.education }}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4">Kursy</span>
            </div>
            <div class="flex content-cv">
              <div class="flex">
                <div class="p-5">
                  <span>{{ user.courses }}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4"
                >Doświadczenie Zawodowe</span
              >
            </div>
            <div class="flex content-cv">
              <div class="flex">
                <div class="p-5">
                  <span>{{ user.workExperience }}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4">Portfolio</span>
            </div>
            <div class="flex content-cv">
              <div class="flex">
                <div class="p-5">
                  <a
                    :href="link"
                    target="_blank"
                    class="flex text-blue-500 p-1"
                    v-for="link in user.portfolioUrls"
                  >
                    <mdicon name="paperclip"></mdicon>
                    <span>{{ link }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card max-h-14 flex">
              <span class="text-lg font-bold h-full p-4"
                >Projekt w zespole Scrumowym</span
              >
            </div>
            <div class="flex content-cv">
              <div class="flex">
                <div class="p-5">
                  <a
                    :href="link"
                    target="_blank"
                    class="flex text-blue-500 p-1"
                    v-for="link in user.projectUrls"
                  >
                    <mdicon name="paperclip"></mdicon>
                    <span>{{ link }}</span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div class="card max-h-14 flex">
                <span class="text-lg font-bold h-full p-4"
                  >Projekt na zaliczenie</span
                >
              </div>
              <div class="flex content-cv">
                <div class="flex">
                  <div class="p-5">
                    <a
                      :href="link"
                      target="_blank"
                      class="flex text-blue-500 p-1"
                      v-for="link in user.projectUrls"
                    >
                      <mdicon name="paperclip"></mdicon>
                      <span>{{ link }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { translator } from '../../components/dictionary/dictionary.js';
import router from '../../router/index.js';
import { useUserStore } from '../../stores/user.js';
import { StudentStatus } from '../../types/enums/student.status.enum.js';

const userStore = useUserStore();
const user = userStore.targetUser;
if (!user.id) router.push('hr-dashboard');

function calcUserExp(exp: number | null) {
  if (exp) {
    return exp === 1 ? `${exp} miesiąc` : `${exp} miesięcy`;
  }
  return 'brak';
}

async function HireStudent() {
  if (await userStore.changeStudentStatus(user.id, StudentStatus.HIRED))
    router.push('hr-dashboard');
}

async function UnreserveStudent() {
  if (await userStore.changeStudentStatus(user.id, StudentStatus.AVAILABLE))
    router.push('hr-dashboard');
}
</script>

<style>
.card {
  background-color: #292a2b;
}

.header {
  color: #4d4d4d;
}
</style>
