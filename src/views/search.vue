<template>
    <div class=" mx-auto py-6">
      <!-- Search Input -->
      <div class="relative mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for experiences"
        class="w-full px-4 py-3 border rounded-2xl pr-10"
      />
      <span class="absolute inset-y-0 right-3 flex items-center text-gray-500">
        <SearchIcon :size="24" />
      </span>
    </div>
  
      <!-- Results Section -->
<div class="">
  <div v-if="filteredCards.length > 0" class="grid grid-cols-2 lg:grid-cols-3 gap-5 gap-x-2">
    <Card
      v-for="card in filteredCards"
      :key="card.id"
      :card="card"
    />
  </div>
  
  <!-- No Results Found -->
  <div v-else class="text-center py-10">
    <p class="text-gray-500 text-lg">No results found for "{{ searchQuery }}"</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else.</p>
  </div>
</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Card from '@/components/shared/card.vue'
import { cards } from '@/constant/home-data'
import { SearchIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'
  
  const searchQuery = ref('')
 
  
  // Computed property for filtered cards
  const filteredCards = computed(() => {
    if (!searchQuery.value.trim()) return cards
  
    return cards.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  </script>
  
  <style scoped>
  /* Add smooth hover effects */
  .card:hover {
    transform: translateY(-2px);
  }
  </style>
  