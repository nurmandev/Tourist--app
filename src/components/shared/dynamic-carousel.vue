<template>
    <div class="relative w-full overflow-hidden">
      <!-- Slides -->
      <div 
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="w-full flex justify-between gap-x-4 flex-shrink-0 mb-5"
        >
          <!-- Use default slot for each slide content -->
          <slot :name="`slide-${index}`">{{ slide }}</slot>
          <img src="/images/icons/chat-bot.svg" alt="Chat bot" class="w-16 object-cover h-14 ">
        </div>
      </div>
  
      <!-- Navigation dots -->
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="h-2 w-5 rounded-full transition-all duration-300 focus:outline-none focus:ring-0 focus:bg-primary"
          :class="currentSlide === index ? 'bg-primary' : 'bg-gray-100'"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  
    <!-- Conditionally render the Next button -->
    <button
      v-if="showNextButton" 
      @click="nextSlide"
      class="w-[90%] flex justify-center mx-auto bg-primary text-white py-3 rounded-lg mt-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Wow, nice! Next 
    </button>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps<{
    slides:  any[];
    showNextButton: boolean // Prop to control visibility of the next button
  }>();
  
  const currentSlide = ref(0);
  let autoplayInterval: number | null = null;
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length;
  }
  
  const goToSlide = (index: number) => {
    currentSlide.value = index;
  }
  
  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 5000) as unknown as number;
  }
  
  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }
  
  onMounted(() => {
    startAutoplay();
  })
  
  onUnmounted(() => {
    stopAutoplay();
  })
  </script>
  