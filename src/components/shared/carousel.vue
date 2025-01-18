<template>
  <div class="relative w-full overflow-hidden">
    <!-- Swiper Container -->
    <swiper-container
      :slides-per-view="1"
      :space-between="30"
      :autoplay-delay="2500" 
      :autoplay-disable-on-interaction="false"
      :pagination="{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet custom-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
      }"
      :free-mode="false"
      class="swiper-container custom-pagination"
    >
      <!-- Slides -->
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="flex flex-col items-center pb-4 -mt-2">
          <img
            :src="slide.image"
            class="w-full object-cover rounded-t-lg"
            :alt="slide.title"
          />
          <div class="text-left py-5 px-4">
            <h2 class="text-xl font-medium text-[#1D0387] mb-3">{{ slide.title }}</h2>
            <p class="font-semibold mb-4">{{ slide.description }}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue vehicula cursus. Donec eu fringilla mauris. Mauris at enim elit.
              <br /><br />
              Sed ligula mi, lobortis vel hendrerit luctus, lobortis eget lorem. Nullam ut justo et neque efficitur rutrum sit amet nec tortor.
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>

    <!-- Navigation Button -->
    <button
      @click="nextSlide"
      class="w-[90%] flex justify-center  mx-auto bg-primary hover:bg-pink-600 text-white py-3 rounded-lg mt-2 transition-colors duration-200 focus:outline-none  focus:ring-offset-2"
    >
      Wow, nice! Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';
//import { Pagination, Autoplay } from "swiper/modules";

register();

// Props for slides
defineProps<{
  slides: Array<{ image: string; title: string; description: string }>;
}>();

// Custom function to go to the next slide
const nextSlide = () => {
  const swiper = document.querySelector('swiper-container');
  if (swiper) {
    const swiperInstance = swiper.swiper;
    swiperInstance.slideNext();
  }
};
</script>

<style>
/* These styles need to be global (no scoped) to work with Swiper Element */
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

/* Optional hover effect for pagination bullets */
.custom-bullet:hover {
  opacity: 0.5 !important;
}
</style>