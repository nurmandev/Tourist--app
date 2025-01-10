<template>
  <section class="mt-5 w-full bg-secondary p-4 rounded-xl ">
    <h2 class="text-xl text-[#1D0387] font-medium mb-4">Did you know?</h2>
    <div class="flex items-center justify-between rounded-lg">
      <!-- Check if showCarousel is true before rendering the carousel -->
      <DynamicCarousel v-if="showCarousel" :slides="text" :showNextButton="false">
        <template v-for="(text, index) in text" :key="index">
          <div :name="`slide-${index}`" class="w-full flex">
            <p class="text-gray-700">{{ text }}</p>
          </div>
          
        </template>
      </DynamicCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DynamicCarousel from './dynamic-carousel.vue';

// Accept the `slides` prop from the parent component
defineProps({
  text: {
    type: Array,
    required: true
  }
});

const showCarousel = ref(true) 
</script>
