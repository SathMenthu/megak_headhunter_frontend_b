<template>
  <div class="flex gap-0.5">
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">Ocena przejścia kursu</div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold">{{ user.courseCompletion || '- ' }} </span>
        <span class="rating-range">/ 5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">
        Ocena aktywności i zaangażowania na kursie
      </div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold">{{ user.courseEngagement || '- ' }} </span>
        <span class="rating-range">/ 5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">Ocena kodu w projekcie własnym</div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold">{{ user.projectDegree || '- ' }} </span>
        <span class="rating-range">/ 5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">Ocena pracy w zespole Scrum</div>
      <div class="item-in-hr-table mt-4">
        <span class="font-bold">{{ user.teamProjectDegree || '- ' }} </span>
        <span class="rating-range">/ 5</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">Preferowane miejsce pracy</div>
      <div class="item-in-hr-table mt-4 font-bold">
        <span> {{ translator(user.expectedTypeWork) || 'brak' }}</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">
        Docelowe miasto, gdzie chce pracować kandydat
      </div>
      <div class="item-in-hr-table mt-4 font-bold">
        <span> {{ user.targetWorkCity || 'brak' }}</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">Oczekiwany typ kontraktu</div>
      <div class="item-in-hr-table mt-4 font-bold">
        <span> {{ translator(user.expectedContractType) || 'brak' }}</span>
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">
        Oczekiwane wynagrodzenie miesięczne netto
      </div>
      <div class="item-in-hr-table mt-4 font-bold">
        {{ user.expectedSalary ? user.expectedSalary + ' zł' : 'brak' }}
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">
        Zgoda na odbycie bezpłatnych praktyk/stażu na początek
      </div>
      <div class="item-in-hr-table mt-4 uppercase font-bold">
        {{ user.canTakeApprenticeship ? 'tak' : 'nie' }}
      </div>
    </div>
    <div class="grid mt-4 expanded-item w-fit p-2">
      <div class="header-in-table">
        Komercyjne doświadczenie w programowaniu
      </div>
      <div class="item-in-hr-table mt-4 font-bold">
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
