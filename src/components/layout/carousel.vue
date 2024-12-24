<template>
    <div  class="relative w-full overflow-hidden">
      <!-- Slides -->
      <div 
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="w-full flex-shrink-0"
        >
          <div class="flex flex-col items-center pb-4 -mt-2">
            <img 
              :src="slide.image" 
              class="w-full h- object-cover rounded-t-lg "
              :alt="slide.title"
            />
            <div class=" text-left py-5 px-4">
                <h2 class="text-xl font-medium text-[#1D0387] mb-3">{{ slide.title }}</h2>
            <p class="font-semibold mb-4">{{ slide.description }}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue vehicula cursus. Donec eu fringilla mauris. Mauris at enim elit.
                <br> <br> Sed ligula mi, lobortis vel hendrerit luctus, lobortis eget lorem. Nullam ut justo et neque efficitur rutrum sit amet nec tortor.
            </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation dots -->
      <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="h-2 w-5 rounded-full transition-all duration-300 focus:outline-none focus:ring-0 focus:bg-primary"
          :class="currentSlide === index ? 'bg-primary' : 'bg-gray-300'"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
    <button
            @click="nextSlide"
            class="w-[90%] flex justify-center mx-auto bg-primary text-white py-3 rounded-lg mt-2  transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
          Wow, nice! Next 
          </button>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps<{
    slides: Array<{ image: string; title: string; description: string }>
  }>()
  
  const currentSlide = ref(0)
  let autoplayInterval: number | null = null
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length
  }
  
  //const previousSlide = () => {
   // currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length
  //}
  
  const goToSlide = (index: number) => {
    currentSlide.value = index
  }
  
  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 5000) as unknown as number
  }
  
  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval)
    }
  }
  
  onMounted(() => {
    startAutoplay()
  })
  
  onUnmounted(() => {
    stopAutoplay()
  })
  </script>
  
  
   <!-- Navigation buttons 
      <button
        @click="previousSlide"
        class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Previous slide"
      >
        <ChevronLeft class="h-6 w-6 text-gray-600" />
      </button>
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Next slide"
      >
        <ChevronRight class="h-6 w-6 text-gray-600" />
      </button> -->