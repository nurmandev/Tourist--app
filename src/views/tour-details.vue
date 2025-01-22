
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
   v-if="tour" class=" min-h-screen flex flex-col ">
    <!-- Back button and header image -->
    <div class="relative ">
      <button @click="goBack" class="absolute top-4 left-4 bg-white p-2 rounded-lg shadow">
        <ArrowLeft />
      </button>
      <img :src="tour.image" alt="Tour" class="w-full h-64 object-cover" />
      <div
       
        class="absolute right-3 bottom-[5.5rem] flex items-center bg-primary p-1.5 rounded-lg"
      >
        <img src="/images/icons/restaurant.svg" alt="label icon" class="w-6 h-6 mr-1" />
      </div>
    </div>

    <!-- Tour Details -->
    <div>
     <div class="bg-white -mt-20 py-4 px-3 rounded-xl relative z-10 mx-4 ">
        <h1 class="text-xl font-bold mb-2">{{ tour.title }}</h1>
      <p class="text-gray-500 mb-4">{{ tour.shares }} shares</p>

      <div class="flex items-center justify-between mb-4">
        <!-- Categories -->
        <div class="flex items-center">
          <span
            v-for="category in tour.categories"
            :key="category"
            class="flex flex-col gap-y-3"
          >
            <img
              v-if="category === `TOBY'S CHOICE`"
              src="/images/icons/toby-choice.svg"
              :alt="category"
              class="w-[4rem] h-auto"
            />
            <img
              v-else-if="category === 'FOR YOU'"
              src="/images/icons/for-you.svg"
              :alt="category"
              class="w-[4rem] h-auto"
            />
          </span>
          <span class="flex items-center font-medium bg-primary-gray py-1 px-2 rounded-lg">
            {{ tour.label }}
            <img src="/images/icons/filter-3.svg" alt="Stamp Icon" class="w-4 h-4 ml-1" />
          </span>
        </div>
        <span class="text-xl font-bold">{{ tour.price }}€</span>
      </div>

     </div>
      <!-- Toby notes Section -->
      <h2 class="text-lg font-semibold mb-2 mt-6">Toby’s notes</h2>
      <div class="bg-[#FFFDEB] rounded-xl p-3 py-5">
        <p>Me and my family did this walking tour and loved it.</p>
      </div>

      <!-- About Section -->
      <h2 class="text-lg font-semibold mb-2 mt-6">About</h2>
      <div class="bg-white rounded-xl p-3 py-5">
        <TruncateText :text="tour.about" :maxLength="120" />
      </div>

      <!-- Did You Know Section -->
      <div class="">
        <DidYouKnow :text="tour.texts" />
       
      </div>

      <!-- Tour Info -->
      <div class="mt-4 bg-white p-3 py-5 space-y-3 rounded-xl">
        <span class="flex items-center gap-x-2">
          <img src="/images/icons/detail-1.svg" alt="duration" />
          {{ tour.distance.time }}
        </span>
        <span class="flex items-center gap-x-2">
          <img src="/images/icons/detail-2.svg" alt="location" />
          {{ tour.distance.location }}
        </span>
        <span class="flex items-center gap-x-2">
          <img src="/images/icons/alarm.svg" alt="availability" />
          {{ tour.distance.availability }}
        </span>
        <div
            v-for="tag in tour.tags"
            :key="tag"
            class="inline-flex mx-2 w-auto px-3 items-center bg-primary-gray rounded-lg "
          >{{tag}}</div>
      </div>

      <div class="mt-4 bg-white p-3 py-5 space-y-3 rounded-xl">
  <span class="flex items-center gap-x-2">
    <img src="/images/icons/detail-1.svg" alt="duration" />
    {{ tour.distance.time }}
  </span>
  <span class="flex items-center gap-x-2">
    <img src="/images/icons/detail-2.svg" alt="location" />
    {{ tour.distance.location }}
  </span>
  <span class="flex items-center gap-x-2">
    <img src="/images/icons/alarm.svg" alt="availability" />
    {{ tour.distance.availability }}
  </span>
  <div
    v-for="tag in tour.tags"
    :key="tag"
    class="inline-flex mx-2 w-auto px-3 items-center bg-primary-gray rounded-lg"
  >
    {{ tag }}
  </div>
</div>

<!-- Conditional Rendering -->
<div
  v-if="tour.id === 1"
  class="bg-white rounded-xl py-5 px-3 mt-5"
>
  <h3 class="font-medium">Ready? Let's roll!</h3>
  <a
    href="https://www.metrolisboa.pt/en/"
    target="_blank"
    class="flex items-center font-medium justify-center gap-x-2 text-center bg-primary mt-5 text-white py-3 rounded-3xl"
  >
   <ExternalLink :size="20" /> Book Now
  </a>
</div>
<div v-else>
  <!-- Check Availability - Action Button -->
  <CheckAvailability />
</div>
    </div>
     <!-- Additional Sections -->
    
      <div class=" mt-5 ">
        <TourDetailSheet :additionalInfo="tour.additionalInfo" />
         <div>
             <!-- How to get there -->
            <h2 class="text-lg font-semibold mt-6 mb-2">How to get there</h2>
      <div class="bg-white rounded-xl py-5 px-3 mt-5 space-y-3 ">
        <span class="flex items-center gap-x-2 border-b-2 border-dashed pb-4 font-medium"> <img src="/images/icons/detail-1.svg" alt="location"> {{ tour.distance.location }}</span>
        <span class="flex items-center gap-x-2"> <img src="/images/icons/detail-3.svg" alt="nearest station"> Take the subway to the {{ tour.distance.nearestStation }} station and just walk from there.</span>
         </div>
         <!-- Map -->
        <img :src="tour.mapImage" alt="Map" class="w-full rounded-lg mt-4" />
        <Related />
         </div>
     </div>
  </div>

  <!-- Fallback for invalid ID -->
  <div v-else class=" flex flex-col justify-center gap-y-4 text-lg text-center mt-20">
    <img src="/images/empty.png" alt="no data found" class="w-[70%] mx-auto">
    <p>We're sorry, this experience is not available right now. Check other exciting experiences below.</p>
    <Button @click="goBack" class=" mt-2">Explore</Button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ChevronRight, SquareArrowOutUpRight, ArrowLeft, ExternalLink } from "lucide-vue-next";
import { CardFullData } from "@/constant/card-data"; 
import TourDetailSheet from "@/components/shared/tour-detail-sheet.vue";
import DidYouKnow from "@/components/shared/did-you-know.vue";
import Button from "@/components/ui/button/Button.vue";
import TruncateText from "@/components/shared/truncateText.vue";
import CheckAvailability from "@/components/shared/tour-details/check-availability.vue";
import Related from "@/components/shared/tour-details/related.vue";

const route = useRoute(); 
const router = useRouter(); 

// Fetch the ID from the route parameters
const id = Number(route.params.id);
//console.log(CardFullData)
// Fetch the product based on the ID
const tour = CardFullData.find(item => item.id === id) || null;
// Handle back navigation
const goBack = () => {
  router.push("/");
};
</script>