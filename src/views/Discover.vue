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
   class=" py-4 text-black relative z-10 ">
    <!-- Header -->
    <header class="mb-4">
      <a href="/?filter=Getting+to+know+Lisbon" class="flex cursor-pointer justify-center w-[50px] bg-white p-2 rounded-lg ">
        <ArrowLeft />
      </a>
      <h1 class="text-2xl font-semibold mt-3">Viewpoints</h1>
    </header>

    <Sheet>
        <SheetTrigger class="text-sm text-left flex items-center gap-x-2">
          <div class="flex items-center justify-between max-w-full w-full rounded-lg bg-[#ededed] gap-x-4 px-3 py-4">
      <div class="w-[80%] leading-tight text-sm">
        Lisbon is known for its charming old neighborhoods, old-fashioned trams, nice food, and rich history. 
        <button @click="openDrawer" class="text-primary font-semibold cursor-pointer">Explore more</button>
      </div>
      <p class="text-[2.5rem]">😎</p>
    </div>
        </SheetTrigger>
      <SheetContent  side="bottom" class="bg-white rounded-t-[30px] no-scrollbar p-0 m-0 z-50  border-0" >
        <div>
          <Carousel :slides="discoverSlides" />
        </div>
        <SheetClose>
          <span  class="absolute z-[99] cursor-pointer  top-3 right-4 text-white">
              <X :size="26"/>
            </span>
        </SheetClose>
      </SheetContent>
    </Sheet>

    <!-- Map View Toggle -->
    <div class="flex w-full items-center justify-between my-5">
      <div class="flex items-center space-x-2">
        <Label htmlFor="map-view" class="text-lg">Map view</Label>
        <Switch id="map-view" />
      </div>
      <div class="text-sm flex items-center gap-x-2">
        <FilterDrawer @apply-filters="handleFilters"/>
      </div>
    </div>

    <!-- Card Grid -->
    <div 
    v-motion
  :initial="{
    opacity: 0,
    y: 100,
  }"
  :enter="{
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: '100',
      delay: 100,
    },
  }"
    class="grid grid-cols-2 gap-3 gap-x-2 mt-4">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card relative flex-shrink-0 bg-white rounded-lg shadow"
      >
        <img :src="card.image" :alt="card.title" class="w-full h-40 object-cover rounded-t-lg" />
        <div class="p-2 rounded-b-lg">
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

<script setup lang="ts">
import { ref } from 'vue'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, X } from 'lucide-vue-next'
import { cards, discoverSlides } from '@/constant/home-data'
import Carousel from '@/components/shared/carousel.vue'
import FilterDrawer from '@/components/shared/filter-drawer.vue'
import SheetClose from '@/components/ui/sheet/SheetClose.vue'

const isOpen = ref(false)
const currentSlide = ref(0)

const openDrawer = () => {
  isOpen.value = true
  currentSlide.value = 0
}

// const closeDrawer = () => {
//   isOpen.value = false
// }

// const nextSlide = () => {
//   if (currentSlide.value < discoverSlides.length - 1) {
//     currentSlide.value++
//   } else {
//     closeDrawer()
//   }
// }

const handleFilters = (filters:any) => {
  // Handle the selected filters
  console.log(filters)
}
// You can keep your filters data here

</script>

<style scoped>
/* Custom styles for scrollbar (if needed) */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

