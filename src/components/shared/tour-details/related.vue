<script setup lang="ts">
import { cards } from '@/constant/home-data';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Get the route parameters
const route = useRoute();
const paramId = Number(route.params.id); 

// Filter cards based on the `id` in params
const filteredCards = computed(() => {
  return cards.filter(card => card.id !== Number(paramId));
});
</script>

<template>
    <h2 class="text-xl mt-8 mb-4 font-semibold">Related Experiences</h2>
  <div class="flex space-x-2 overflow-x-auto no-scrollbar">
    <div
      v-for="card in filteredCards"
      :key="card.id"
      class="card w-[200px] relative flex-shrink-0 bg-white rounded-lg shadow"
    >
      <img
        :src="card.image"
        :alt="card.title"
        class="w-full h-40 object-cover rounded-t-lg"
      />
      <div class="p-2 rounded-b-lg">
        <h3 class="font-semibold text-md line-clamp-2 leading-tight">
          {{ card.title }}
        </h3>
        <div class="flex items-center justify-between">
          <span
            v-if="card.label"
            class="text-xs text-gray-500 mt-1 block"
          >
            {{ card.label }}
          </span>
        </div>
        <!-- Icons -->
        <div class="absolute top-2 right-2 flex items-center gap-x-2 space-y-1">
          <div
            v-for="icon in card.icons"
            :key="icon"
            class="flex items-center bg-primary px-2 py-1 rounded-full"
          >
            <img
              :src="icon"
              alt="label icon"
              class="w-4 h-4 mr-1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
