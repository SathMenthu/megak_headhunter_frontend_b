<template>
  <div class="flex gap-0.5">
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">Ocena przejścia kursu</div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold text-base">{{ user.courseCompletion || '- ' }} </span>
        <span class="rating-range text-base"> /5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">
        Ocena aktywności i zaangażowania na kursie
      </div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold text-base">{{ user.courseEngagement || '- ' }} </span>
        <span class="rating-range text-base"> /5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">Ocena kodu w projekcie własnym</div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold text-base">{{ user.projectDegree || '- ' }} </span>
        <span class="rating-range text-base"> /5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">Ocena pracy w zespole Scrum</div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold text-base">{{ user.teamProjectDegree || '- ' }} </span>
        <span class="rating-range text-base"> /5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">Preferowane miejsce pracy</div>
      <div class="item-in-hr-table mt-4 font-bold">
        <span class="text-sm"> {{ translator(user.expectedTypeWork) || 'brak' }}</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">
        Docelowe miasto, gdzie chce pracować kandydat
      </div>
      <div class="item-in-hr-table mt-4 font-bold">
        <span class="text-sm"> {{ user.targetWorkCity || 'brak' }}</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">Oczekiwany typ kontraktu</div>
      <div class="item-in-hr-table mt-4 font-bold">
        <span class="text-sm"> {{ translator(user.expectedContractType) || 'brak' }}</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">
        Oczekiwane wynagrodzenie miesięczne netto
      </div>
      <div class="item-in-hr-table mt-4 font-bold text-sm">
        {{ user.expectedSalary ? user.expectedSalary + ' zł' : 'brak' }}
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">
        Zgoda na odbycie bezpłatnych praktyk/stażu na początek
      </div>
      <div class="item-in-hr-table mt-4 uppercase font-bold text-sm">
        {{ user.canTakeApprenticeship ? 'tak' : 'nie' }}
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table text-xs">
        Komercyjne doświadczenie w programowaniu
      </div>
      <div class="item-in-hr-table mt-4 font-bold text-sm">
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
