<script setup lang="ts">
import {cards, filters} from '@/constant/home-data';
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {  ArrowDownUp, ArrowLeft, SlidersHorizontal } from 'lucide-vue-next';
</script>

<template>
    <div class="p-2 py-4 mb-20 text-black">
      <!-- Header -->
      <header class=" mb-4">
        <span class="flex justify-center w-[50px] bg-white p-2 rounded-lg "><ArrowLeft /> </span>
        <h1 class="text-2xl font-semibold mt-3">Viewpoints 
        </h1>
      </header>
  
      

  <div class="flex items-center  justify-between max-w-full w-full rounded-lg bg-[#ededed] gap-x-4 px-3 py-4">
   <div class="w-[80%] leading-tight text-sm">
    Lisbon is known for its charming old neighborhoods, old-fashioned trams, nice food, and rich history. 
      <span href="" class="text-primary font-semibold">  Explore more</span>
   </div>
   <p class="text-[2.5rem]">😎</p>
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
      
      <div class="grid grid-cols-2 gap-3 gap-x-2 mt-4">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card relative   flex-shrink-0 bg-white rounded-lg shadow"
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
  name: "Discover",
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
  