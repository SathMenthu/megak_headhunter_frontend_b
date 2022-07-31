<template>
  <nav>
    <ul class="flex">
      <button
        class="pagg-block mr-1"
        :disabled="currentPage < 2"
        @click="$emit('update:pageValue', currentPage - 1)"
      >
        <mdicon name="arrow-left-thick" />
      </button>
      <li
        class="pagg-block mr-1"
        v-if="currentPage > 3"
        @click="$emit('update:pageValue', 1)"
      >
        {{ 1 }}
      </li>
      <span class="flex items-end px-2" v-if="currentPage - 1 > 3">...</span>
      <li
        class="pagg-block mr-1"
        v-if="currentPage > 2"
        @click="$emit('update:pageValue', currentPage - 2)"
      >
        {{ currentPage - 2 }}
      </li>
      <li
        class="pagg-block mr-1"
        v-if="currentPage > 1"
        @click="$emit('update:pageValue', currentPage - 1)"
      >
        {{ currentPage - 1 }}
      </li>
      <li class="pagg-block pagg-active" v-if="total">
        {{ currentPage }}
      </li>
      <li
        class="pagg-block ml-1"
        v-if="currentPage < lastPage - 1"
        @click="$emit('update:pageValue', currentPage + 1)"
      >
        {{ currentPage + 1 }}
      </li>
      <li
        class="pagg-block ml-1"
        v-if="currentPage < lastPage - 2"
        @click="$emit('update:pageValue', currentPage + 2)"
      >
        {{ currentPage + 2 }}
      </li>
      <span class="flex items-end px-2" v-if="lastPage - currentPage > 3"
        >...</span
      >
      <li
        class="pagg-block ml-1"
        v-if="lastPage !== currentPage && lastPage !== 0"
        @click="$emit('update:pageValue', lastPage)"
      >
        {{ lastPage }}
      </li>
      <button
        class="pagg-block ml-1"
        :disabled="lastPage - currentPage < 1"
        @click="$emit('update:pageValue', currentPage + 1)"
      >
        <mdicon name="arrow-right-thick" />
      </button>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps(['currentPage', 'lastPage', 'total']);
defineEmits(['update:pageValue']);
</script>

<style></style>
