<script setup lang="ts">
// @ts-ignore
import DidYouKnow from '@/components/shared/did-you-know.vue';
// @ts-ignore
import TrendyNeighborhood from '@/components/shared/trendy-neighborhood.vue';
import TruncateText from '@/components/shared/truncateText.vue';
import { exploreLocations, randomTexts } from '@/constant/home-data';
import { ArrowLeft } from 'lucide-vue-next';
  </script>
  
<template>
    <div 
    v-motion
    :initial="{
      opacity: 0,
      x: 100,
    }"
    :enter="{
      opacity: 1,
      x: 0,
      transition: {
        delay: 50,
        duration: 300,
      },
    }"
    class="w-full text-gray-900 ">
         <!-- Header Section -->
      <header class="px-5 py-2 bg-no-repeat bg-center bg-cover w-full h-[55vh] bg-[url('/images/explore-lisbon.png')] rounded-2xl">
        <a href="/?filter=Getting+to+know+Lisbon" class=" w-[40px] h-10 flex items-center justify-center bg-white  rounded-lg "><ArrowLeft /> </a>
        <p class="mt-5 text-white">
            This is Lisbon at it’s best, <br> let’s explore!
        </p>
      
      </header>
      <!-- About Section -->
      <section class="p-6 w-full bg-white rounded-lg shadow mt-6">
        <h1 class="text-2xl font-medium mb-2">About</h1>
        <TruncateText :text="'Lisbon is one of the oldest cities in the world and the second-oldest European capital city (after Athens), predating other.'" :maxLength="110" />
      </section>
  
      <!-- Trendy Neighborhoods -->
      <TrendyNeighborhood />
  
      <!-- Did You Know -->
     
        <DidYouKnow :text="randomTexts" />
  
      <!-- Useful Portuguese Phrases -->
      <section class="mt-5 flex justify-between w-full bg-secondary  p-6 rounded-lg">
       <div>
        <h2 class="text-lg font-medium mb-4 text-[#1D0387]">Useful Portuguese Phrases</h2>
        <ul class="space-y-4">
          <li class="text-md italic">
            <span class="text-sm not-italic">Hello, all good?</span> <br> Olá, tudo bem?
          </li>
          <li class="text-md italic">
            <span class="text-sm not-italic">See you tomorrow</span> <br> Até amanhã
          </li>
          <li class="text-md italic">
            <span class="text-sm  non-italic">How much?</span> <br> Quanto custa?
          </li>
          <li class="text-md italic">
            <span class="text-sm  non-italic">The bill please</span> <br> A conta por favor
          </li>
          <li class="text-md italic">
            <span class="text-sm  non-italic">What is your recommendation?</span> <br>Qual é a sua recomendação?
          </li>
          <li class="text-md italic">
            <span class="text-sm  non-italic">Where’s the bathroom?</span> <br> Onde é a casa de banho?
          </li>
        </ul>
       </div>
       <img src="/images/icons/portuguese.svg" alt="Chat bot" class="w-20 object-contain h-20 ">
      </section>
  
      <!-- Statistics -->
      <section class="mt-5 grid grid-cols-2 gap-3 w-full mx-auto ">
  <div class="bg-white p-4 rounded-lg shadow">
    <p class="text-md font-medium">Population</p>
    <p class="text-2xl font-bold">~3M</p>
  </div>
  <div class="bg-white p-4  rounded-lg shadow">
    <p class="text-md font-medium">Visitors per year</p>
    <p class="text-2xl font-bold">~15.3M</p>
  </div>
  <div class="bg-white col-span-2 flex items-center justify-between p-4 rounded-lg shadow">
    <div>
    <p class="text-md font-medium">SOS number</p>
    <p class="text-2xl font-bold">112</p>
    </div>
   
    <img src="/images/icons/health-cross.svg" alt="Chat bot" class="w-12 object-contain h-12 ">
  
  </div>
</section>
  
      <!-- Iconic Spots -->
      <section class="mt-5 w-full">
        <h2 class="text-2xl font-semibold mb-4">Iconic spots</h2>
        <div class="flex space-x-2 overflow-x-auto no-scrollbar">
          <img src="/images/iconic-spot1.png" alt="Spot 1" class="w-48 object-cover h-32 rounded-lg ">
          <img src="/images/iconic-spot2.png" alt="Spot 2" class="w-48 h-32 rounded-lg ">
          <img src="/images/iconic-spot3.png" alt="Spot 3" class="w-48 h-32 rounded-lg ">
        </div>
      </section>
  
      <!-- How to Move Around -->
      <section class="mt-5 w-full">
      <h2 class="text-2xl font-semibold mb-2">How to move around</h2>
      <div class="flex space-x-4 overflow-x-auto">
        <div
          v-for="location in exploreLocations"
          :key="location.name"
          class="text-center cursor-pointer"
        >
          <router-link
            :to="`/explore-around?location=${location.name.toLowerCase()}`"
            class="block"
          >
            <img
              :src="location.image"
              :alt="location.name"
              class="w-full object-contain h-36 rounded-lg"
            />
          </router-link>
        </div>
      </div>
    </section>

      <!-- Events This Month -->
      <section class="mt-5">
        <h2 class="text-2xl font-bold mb-4">What's going on this month</h2>
        <div class="flex space-x-2 overflow-x-auto">
            <img src="/images/month1.png" alt="Spot 2" class="w-full cursor-pointer h-36 object-cover rounded-lg ">
            <img src="/images/month2.png" alt="Spot 3" class="w-full cursor-pointer h-36 object-cover rounded-lg ">
         
        </div>
      </section>
    </div>
  </template>
  
 