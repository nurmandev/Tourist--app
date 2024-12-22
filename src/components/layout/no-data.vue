<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  filter: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 class="text-lg font-medium text-gray-900 mb-2">No data available</h3>
    <p class="text-gray-500">
      There are currently no items available for the "{{ props.filter }}" filter.
    </p>
  </div>
</template>


