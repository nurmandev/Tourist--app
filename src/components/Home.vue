<script setup lang="ts">
import {cards, filters} from '@/constant/home-data';
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowDownUp, SlidersHorizontal } from 'lucide-vue-next';
</script>

<template>
    <div class="p-2 py-4 mb-20 text-black">
      <!-- Header -->
      <header class=" mb-4">
        <h1 class="text-2xl font-semibold">Hey there, <br/> here's Toby's list</h1>
        <a href="#" class="text-primary hover:underline text-md mt-2">See Toby's notes for you</a>
      </header>
  
      <!-- Search Bar -->
      <div class="relative mb-4">
  <input
    type="text"
    placeholder="Search for experiences"
    class="w-full px-4 py-3 border rounded-2xl pr-10"
  />
  <span class="absolute inset-y-0 right-3 flex items-center text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  </span>
</div>
  
      <!-- Filters -->
      <div class="flex max-w-full w-full overflow-x-scroll no-scrollbar gap-x-4 px-1 py-4">
    <div
      v-for="filter in filters"
      :key="filter.id"
       class="bg-white hover:border-primary hover:shadow-lg transition-all duration-200 rounded-lg w-[130px] flex-shrink-0 p-3 flex flex-col items-center shadow-md"
    >
      <img :src="filter.image" :alt="filter.title" class="w-10 h-10 object-contain" />
      <span class="mt-4 text-sm text-center font-medium text-gray-700">{{ filter.title }}</span>
      
    </div>
  </div>
  
      <!-- Map View Toggle -->
      <div class="flex items-center justify-between mb-4 mt-2">
        <div className="flex items-center space-x-2">
      <Switch id="map-view" />
      <Label htmlFor="map-view" class="text-lg">Map view</Label>
    </div>
        <div class="text-sm flex items-center gap-x-2">
          <span  class="bg-white rounded-lg p-2"><SlidersHorizontal :size="16" /></span>
          <span  class="bg-white rounded-lg p-2"><ArrowDownUp :size="16" /></span>
        </div>
      </div>
  
      <!-- Card Grid -->
      <div class=" grid grid-cols-2 gap-3 gap-x-2 mt-4">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card relative bg-white rounded-lg shadow"
      >
        <img :src="card.image" :alt="card.title" class="w-full h-40 object-cover rounded-t-lg" />
       
        <div class=" p-2 rounded-b-lg">
          <h3 class="font-semibold text-md line-clamp-2 leading-tight">{{ card.title }}</h3>
          <div class='flex items-center justify-between'>
            <p class="text-xs text-gray-500 mt-1">{{ card.price }}</p>
      <span v-if="card.label" class="text-xs text-gray-500 mt-1 block">
        {{ card.label }}
      </span>
          </div>
    <!-- Categories -->
    <div class="absolute bottom-[6.5rem] left-0 space-y-1.5">
      <span v-for="category in card.categories" :key="category" class="flex flex-col gap-y-3">
        <img
          v-if="category === `TOBY'S CHOICE`"
          :src="'/images/icons/toby-choice.svg'"
          :alt="category"
          class="w-16 h-auto"
        />
        <img
          v-else-if="category === 'FOR YOU'"
          :src="'/images/icons/for-you.svg'"
          :alt="category"
          class="w-16 h-auto"
        />
      </span>
    </div>
    <!-- Icons -->
    <div class="absolute top-2 right-2 flex items-center gap-x-2 space-y-1">
      <div
        v-for="icon in card.icons"
        :key="icon"
        class="flex items-center bg-primary px-2 py-1 rounded-full"
      >
        <img :src="icon" alt="label icon" class="w-4 h-4 mr-1" />
        
      </div>
    </div>
   
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script lang="ts">
export default {
  name: "HomePage",
  data() {
    return {
      filters, 
    };
  },
};
  </script>
  
  <style>
  /* Custom styles for scrollbar (if needed) */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  