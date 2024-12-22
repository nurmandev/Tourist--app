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

  <div class="flex items-center  justify-between max-w-full w-full rounded-lg bg-[#ededed] gap-x-4 px-3 py-4">
   <div class="w-[80%] leading-tight text-sm">
    Lisbon is known for its charming old neighborhoods, old-fashioned trams, nice food, and rich history. 
      <span href="" class="text-primary font-semibold">  Explore more</span>
   </div>
   <p class="text-[2.5rem]">🤩</p>
  </div>
  
      <!-- Map View Toggle -->
      <div class="flex w-full items-center justify-between my-5">
        <div className="flex items-center space-x-2">
            <Label htmlFor="map-view" class="text-lg">Map view</Label>
      <Switch id="map-view" />
     
    </div>
        <div class="text-sm flex items-center gap-x-2">
          <span  class="bg-white rounded-lg p-2"><SlidersHorizontal :size="16" /></span>
          <span  class="bg-white rounded-lg p-2"><ArrowDownUp :size="16" /></span>
        </div>
      </div>
  
      <!-- Card Grid -->
       <div class="flex items-center justify-between mt-10">
        <p class="text-md font-medium">Viewpoints</p>
        <p class="text-sm text-primary font-semibold">Discover More</p>
       </div>
      <div class=" flex w-full items-center overflow-x-scroll no-scrollbar gap-3 gap-x-2 mt-4 pb-3">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card relative w-[220px]  flex-shrink-0 bg-white rounded-lg shadow"
      >
        <img :src="card.image" :alt="card.title" class="w-full h-40 object-cover rounded-t-lg" />
       
        <div class=" p-2 rounded-b-lg">
          <h3 class="font-semibold text-md line-clamp-2 leading-tight">Enjoy Miradouro Castelo de São Jorge, a historical one</h3>
          <div class='flex items-center justify-between'>
      <span v-if="card.label" class="text-xs text-gray-500 mt-1 block">
       free
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

     <!-- Card Grid -->
     <div class="flex items-center justify-between mt-10">
        <p class="text-md font-medium">Neighborhoods</p>
        <p class="text-sm text-primary font-semibold">Discover More</p>
       </div>
      <div class=" flex w-full items-center overflow-x-scroll no-scrollbar gap-3 gap-x-2 mt-4 pb-3">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card relative w-[220px]  flex-shrink-0 bg-white rounded-lg shadow"
      >
        <img :src="card.image" :alt="card.title" class="w-full h-40 object-cover rounded-t-lg" />
       
        <div class=" p-2 rounded-b-lg">
          <h3 class="font-semibold text-md line-clamp-2 leading-tight">Enjoy Miradouro Castelo de São Jorge, a historical one</h3>
          <div class='flex items-center justify-between'>
      <span v-if="card.label" class="text-xs text-gray-500 mt-1 block">
       free
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

     <!-- Card Grid -->
     <div class="flex items-center justify-between mt-10">
        <p class="text-md font-medium">Parks & Gardens</p>
        <p class="text-sm text-primary font-semibold">Discover More</p>
       </div>
      <div class=" flex w-full items-center overflow-x-scroll no-scrollbar gap-3 gap-x-2 mt-4 pb-3">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card relative w-[220px]  flex-shrink-0 bg-white rounded-lg shadow"
      >
        <img :src="card.image" :alt="card.title" class="w-full h-40 object-cover rounded-t-lg" />
       
        <div class=" p-2 rounded-b-lg">
          <h3 class="font-semibold text-md line-clamp-2 leading-tight">Enjoy Miradouro Castelo de São Jorge, a historical one</h3>
          <div class='flex items-center justify-between'>
      <span v-if="card.label" class="text-xs text-gray-500 mt-1 block">
       free
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
  name: "GetToKnowLisbon",
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
  