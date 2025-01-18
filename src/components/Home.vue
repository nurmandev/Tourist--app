<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { cards, filters } from '@/constant/home-data'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {  ArrowDownUp, Search, X, ArrowUpDown } from 'lucide-vue-next'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer'
import CardSkeleton from './shared/card-skeleton.vue'
import GetToKnowLisbon from '@/views/Get-to-know-Lisbon.vue'
import NoData from './shared/no-data.vue'
import Button from "@/components/ui/button/Button.vue";
import Card from './shared/card.vue'
import FilterDrawer from '@/components/shared/filter-drawer.vue'
import SearchSheet from './shared/search-sheet.vue'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)
const searchQuery = ref('')
const activeFilter = ref('')
const isSortedList = ref(false);
const isAscending = ref(true)   // Default sort direction: Ascending
const isSortDropdownOpen = ref(false)  // Controls dropdown visibility

// Toggle dropdown visibility
const toggleSortDropdown = () => {
  isSortDropdownOpen.value = !isSortDropdownOpen.value
}

// Set sort direction
const setSortDirection = (ascending: boolean) => {
  isAscending.value = ascending
  isSortDropdownOpen.value = false
  isSortedList.value = true // Ensure sorting is active
}
const filteredCards = computed(() => {
  let result = cards;

  if (searchQuery.value) {
    result = result.filter(card =>
      card.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    
  }

  if (activeFilter.value) {
  const normalizedFilter = activeFilter.value.trim().toLowerCase(); 
  
  switch (normalizedFilter) {
    case "for you":
      result = result.filter(card => card.categories.some(category => category.toLowerCase() === "for you"));
      break;
    case "toby's choice":
      result = result.filter(card => card.categories.some(category => category.toLowerCase() === "toby's choice"));
      break;
      case "original from lisbon":
      result = result.filter(card => card.label.toLowerCase() === "original");
      break;
      case "getting to know lisbon":
        break;
      default:
        result = result.filter(card => card.categories.includes(activeFilter.value));
    }
    
  }

  if (isSortedList.value) {
    result = [...result].sort((a, b) => 
    isAscending.value ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    )
      }
  return result;
});

const handleFilters = (filters:any) => {
  // Handle the selected filters
  console.log(filters)
}

const setFilter = (filter: string) => {
  activeFilter.value = activeFilter.value == filter ? '' : filter
  updateUrlParams()
}

const updateUrlParams = () => {
  const query = { ...route.query }
  if (activeFilter.value) {
    query.filter = activeFilter.value
  } else {
    delete query.filter
  }
  router.push({ query })
}

watch(() => route.query, (newQuery) => {
  if (newQuery.filter) {
    activeFilter.value = newQuery.filter as string
  } else {
    activeFilter.value = ''
  }
}, { immediate: true })

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <div class="py-4 text-black">
    <!-- Header -->
    <header class="mb-4">
      <h1 class="text-2xl font-semibold">Hey there, <br/> here's Toby's list</h1>
      <Drawer>
  <DrawerTrigger as-Child>
    <a href="#" class="text-primary hover:underline text-md mt-2">See Toby's notes for you</a>
  </DrawerTrigger>
  <DrawerContent class=' bg-white pb-5 px-5'>
    <DrawerHeader class="px-0">
      <DrawerTitle >Toby's notes</DrawerTitle>
    </DrawerHeader>
    <div class="pb-5">
      <h3>About the list</h3>
     <p  class="bg-[#ededed] p-3 rounded-lg mt-2 text-sm">I've handpicked some awesome experiences with just the perfect balance of must-sees and off the beaten track. Hope you have an amazing time!</p> 
    </div>
    <span class="border-dashed border-2 w-full mb-5"></span>
    <h3>Notes just for you</h3>
    <p class='text-sm bg-[#ededed] p-3 rounded-lg mt-2'>Ao 26 vegetarian restaurant: <a href="https://g.co/kgs/VZSqW8e" class="text-primary font-semibold">https://g.co/kgs/VZSqW8e</a></p>
    <DrawerClose as-child>
            <Button variant="outline" class="absolute top-4 right-5">
              <X />
            </Button>
          </DrawerClose>
  </DrawerContent>
</Drawer>
    </header>

    <!-- Search Bar -->
     <div>
      <Drawer>
<DrawerTrigger class="w-full">
    <div class="relative mb-4">
      <input
        v-model="searchQuery"
        type="text"
        readonly
        placeholder="Search for experiences"
        class="w-full cursor-pointer focus:border-none focus:outline-0 px-4 py-3 border rounded-2xl pr-10"
      />
      <span class="absolute inset-y-0 right-3 flex items-center text-gray-500">
        <Search :size="24" />
      </span>
    </div>
  </DrawerTrigger>
 <SearchSheet />
  </Drawer>
</div>
    

    <!-- Filters -->
    <div class="flex max-w-full w-full overflow-x-scroll no-scrollbar gap-x-4 px-1 py-4">
      <div
        v-for="filter in filters"
        :key="filter.id"
        @click="setFilter(filter.title)"
        :class="[
          'bg-white hover:shadow-lg transition-all duration-200 rounded-lg w-[130px] flex-shrink-0 p-3 flex flex-col items-center shadow-md cursor-pointer',
          activeFilter === filter.title ? 'border-2 border-primary' : 'hover:border-primary'
        ]"
      >
        <img :src="filter.image" :alt="filter.title" class="w-10 h-10 object-contain" />
        <span class="mt-4 text-sm text-center font-medium text-gray-700">{{ filter.title }}</span>
      </div>
    </div>

    <!-- Map View Toggle -->
    <div :class="[activeFilter === 'Getting to know Lisbon' ? 'hidden' : 'flex  items-center justify-between mb-4 mt-2' ]">
  <div class="flex items-center space-x-2">
    <Label for="map-view" class="text-lg">Map view</Label>
    <Switch id="map-view" />
  </div>
  <div class="text-sm flex items-center gap-x-2">
    <FilterDrawer  @apply-filters="handleFilters"/>
    <div class="relative">
      <div 
        @click="toggleSortDropdown" 
        class="bg-white rounded-lg p-2 cursor-pointer flex items-center gap-x-2"
      >
      <span v-if="isAscending">
    <ArrowDownUp :size="16" />
  </span>
  <span v-else>
    <ArrowUpDown :size="16" />
  </span>
      </div>
      <!-- Sort Options Dropdown -->
      <div 
        v-if="isSortDropdownOpen" 
        class="absolute bg-white shadow-lg rounded-lg top-full mt-2 right-0 w-32 py-2 z-10"
      >
        <button 
          @click="setSortDirection(true)" 
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          Ascending
        </button>
        <button 
          @click="setSortDirection(false)" 
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          Descending
        </button>
      </div>
    </div>
  </div>
</div>

    <!-- Content -->
    <template v-if="isLoading">
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
        <CardSkeleton v-for="i in 6" :key="i" />
      </div>
    </template>
    <template v-else-if="activeFilter === 'Getting to know Lisbon'">
      <GetToKnowLisbon :cardlist="filteredCards" />
    </template>
    <template v-else-if="filteredCards.length === 0">
      <NoData :filter="activeFilter" />
    </template>
    <template v-else>
      <div class="grid grid-cols-2 gap-3 gap-x-2 mt-4">
        <Card
          v-for="card in filteredCards"
          :key="card.id"
          :card="card"
        />
      </div>
    </template>
  </div>
</template>


