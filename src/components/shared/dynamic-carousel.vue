<template>
  <div class="relative w-full overflow-hidden">
    <!-- Swiper Container -->
    <swiper-container
      :slides-per-view="1"
      :space-between="30"
      :autoplay-delay="5000"
      :autoplay-disable-on-interaction="false"
      :pagination="{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet custom-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
      }"
      class="swiper-container custom-pagination"
    >
      <!-- Slides -->
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="w-full flex justify-between gap-x-4 flex-shrink-0 mb-5">
          <!-- Slot for custom content -->
          <slot :name="`slide-${index}`">
            {{ slide }}
          </slot>
          <img
            src="/images/icons/chat-bot.svg"
            alt="Chat bot"
            class="w-16 object-cover h-14"
          />
        </div>
      </swiper-slide>
    </swiper-container>

    <!-- Conditionally render the Next button -->
    <button
      v-if="showNextButton"
      @click="nextSlide"
      class="w-[90%] flex justify-center mx-auto bg-primary text-white py-3 rounded-lg mt-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Wow, nice! Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';

register();

// Props for slides and button visibility
defineProps<{
  slides: any[];
  showNextButton: boolean;
}>();

// Custom function for next slide
const nextSlide = () => {
  const swiper = document.querySelector('swiper-container');
  if (swiper) {
    const swiperInstance = swiper.swiper;
    swiperInstance.slideNext();
  }
};
</script>

<style>
/* Custom Swiper styles */
.custom-pagination {
  --swiper-pagination-bottom: 10px;
  --swiper-pagination-bullet-inactive-color: #999999;
  --swiper-pagination-color: #fd216e;
  --swiper-pagination-bullet-size: 20px;
  --swiper-pagination-bullet-height: 9px;
  --swiper-pagination-bullet-inactive-opacity: 0.2;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-border-radius: 5px;
}

.custom-bullet {
  width: var(--swiper-pagination-bullet-size) !important;
  height: var(--swiper-pagination-bullet-height) !important;
  border-radius: var(--swiper-pagination-bullet-border-radius) !important;
  background: var(--swiper-pagination-bullet-inactive-color) !important;
  opacity: var(--swiper-pagination-bullet-inactive-opacity) !important;
  margin: 0 4px !important;
  transition: all 0.3s ease;
}

.custom-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity) !important;
  background: var(--swiper-pagination-color) !important;
  width: calc(var(--swiper-pagination-bullet-size) * 1.2) !important; /* Slightly wider when active */
}

.custom-bullet:hover {
  opacity: 0.5 !important;
}
</style>
