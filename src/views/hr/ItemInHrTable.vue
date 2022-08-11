<template>
  <div class="flex gap-0.5">
    <div class="expanded-item">
      <div class="header-in-table text-xs">Ocena przejścia kursu</div>
      <div class="mt-4 text-base">
        <span class="font-bold">{{ user.courseCompletion || '- ' }} </span>
        <span class="text-[#9E9E9E]"> /5</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">
        Ocena aktywności i zaangażowania na kursie
      </div>
      <div class="mt-4 text-base">
        <span class="font-bold">{{ user.courseEngagement || '- ' }} </span>
        <span class="text-[#9E9E9E]"> /5</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">Ocena kodu w projekcie własnym</div>
      <div class="mt-4 text-base">
        <span class="font-bold">{{ user.projectDegree || '- ' }} </span>
        <span class="text-[#9E9E9E]"> /5</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">Ocena pracy w zespole Scrum</div>
      <div class="mt-4">
        <span class="font-bold">{{ user.teamProjectDegree || '- ' }} </span>
        <span class="text-[#9E9E9E]"> /5</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">Preferowane miejsce pracy</div>
      <div class="mt-4 font-bold">
        <span class="text-sm"> {{ translator(user.expectedTypeWork) || 'brak' }}</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">
        Docelowe miasto, gdzie chce pracować kandydat
      </div>
      <div class="mt-4 font-bold">
        <span class="text-sm"> {{ user.targetWorkCity || 'brak' }}</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">Oczekiwany typ kontraktu</div>
      <div class="mt-4 font-bold">
        <span class="text-sm"> {{ translator(user.expectedContractType) || 'brak' }}</span>
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">
        Oczekiwane wynagrodzenie miesięczne netto
      </div>
      <div class="mt-4 font-bold text-sm">
        {{ user.expectedSalary ? user.expectedSalary + ' zł' : 'brak' }}
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">
        Zgoda na odbycie bezpłatnych praktyk/stażu na początek
      </div>
      <div class="mt-4 uppercase font-bold text-sm">
        {{ user.canTakeApprenticeship ? 'tak' : 'nie' }}
      </div>
    </div>
    <div class="expanded-item">
      <div class="header-in-table text-xs">
        Komercyjne doświadczenie w programowaniu
      </div>
      <div class="mt-4 font-bold text-sm">
        {{ calcUserExp(user.monthsOfCommercialExp) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { translator } from '../../components/dictionary/dictionary.js';
defineProps(['user']);

function calcUserExp(exp: number | null) {
  if (exp) {
    return exp === 1 ? `${exp} miesiąc` : `${exp} miesięcy`;
  }
  return 'brak';
}
</script>
