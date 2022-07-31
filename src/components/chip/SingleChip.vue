<template>
  <span class="ml-1 px-3 py-2 mt-1 rounded-full bg-gray-700 font-semibold text-sm flex align-center w-max">
    {{ translator(text) }}
  </span>
</template>

<script lang="ts" setup>
import { translator } from '../dictionary/dictionary';

defineProps(['text']);
</script>
