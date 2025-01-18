<script setup lang="ts">
import BottomSheet from './bottom-sheet.vue';
import Button from '../ui/button/Button.vue';
import { cards } from '@/constant/home-data';
import { SearchIcon, Share } from 'lucide-vue-next';
import { ref, computed } from 'vue';

// Reactive search query
const searchQuery = ref('');

// Computed property for filtered cards
const filteredCards = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return query
    ? cards.filter((card) => card.title.toLowerCase().includes(query))
    : [];
});

// Function to handle sharing
const handleShare = (cardTitle: string) => {
  if (navigator.share) {
    // Using Web Share API
    navigator.share({
      title: cardTitle,
      text: `Check out this experience: ${cardTitle}`,
      url: window.location.href, 
    }).then(() => {
      alert('Shared successfully!');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert('Sharing is not supported in this browser.');
  }
};
</script>

<template>
  <BottomSheet :title="`Search for anything`" :open="true">
    <!-- Search Input -->
    <div class="relative mt-3 mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for experiences"
        class="w-full caret-primary focus:outline-none shadow-md px-4 py-3 border rounded-2xl pr-10"
      />
      <span class="absolute inset-y-0 right-3 flex items-center text-gray-500">
        <SearchIcon :size="24" />
      </span>
    </div>

    <!-- Clear All (Only shown when there is a query) -->
    <span 
      v-if="searchQuery" 
      @click="searchQuery = ''"
      class="text-primary text-xl font-semibold cursor-pointer"
    >
      Clear all
    </span>

    <div class="mt-5">
      <!-- Display Filtered Cards -->
      <div v-if="filteredCards.length > 0" class="grid grid-cols-1 gap-2">
        <div
          v-for="card in filteredCards"
          :key="card.id"
          class="bg-white flex items-center p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="w-full flex items-center gap-x-2">
            <img
              :src="card.image"
              :alt="card.title"
              class="w-1/3 h-14 rounded-xl object-cover"
            />
            <div class="w-full">
              <h2 class="text-lg font-medium mb-2 line-clamp-2">
                {{ card.title }}
              </h2>
            </div>
          </div>
          <div class="p-3 cursor-pointer" @click="handleShare(card.title)">
            <Share />
          </div>
        </div>
      </div>

      <!-- No Results Found -->
      <div v-else-if="searchQuery.trim()" class="text-center py-10">
        <p class="text-gray-500 text-lg">
          No results found for "{{ searchQuery }}"
        </p>
        <p class="no-results">
          Try searching for something else.
        </p>
      </div>
    </div>

    <!-- Search Button -->
    <Button class="mt-5 w-full" @click="() => {}">Search</Button>
  </BottomSheet>
</template>
