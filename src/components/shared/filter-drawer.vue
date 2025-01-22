
<template>
    <div >
      <Sheet>
        <SheetTrigger class="text-sm flex items-center gap-x-2">
          <span class="bg-white rounded-lg p-2 cursor-pointer">
            <SlidersHorizontal :size="16" />
          </span>
        </SheetTrigger>
  
        <SheetContent side="bottom" class="w-full h-[80vh] mx-auto rounded-t-3xl border-0 font-medium sm:max-w-md overflow-y-auto bg-white px-4 no-scrollbar">
          <SheetHeader>
            <SheetTitle class='text-left text-2xl pt-8'>Filters</SheetTitle>
          </SheetHeader>
  
          <div class="py-6 space-y-6">
            <!-- Price -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Price</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="price in filters.price" 
                  :key="price"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.price.includes(price) }"
                  @click="toggleFilter('price', price)"
                >
                  {{ price }}
                </span>
              </div>
            </div>
  
            <!-- Weather -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Weather</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="weather in filters.weather" 
                  :key="weather"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.weather.includes(weather) }"
                  @click="toggleFilter('weather', weather)"
                >
                  {{ weather }}
                </span>
              </div>
            </div>
  
            <!-- Location -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Location</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="location in filters.location" 
                  :key="location"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.location.includes(location) }"
                  @click="toggleFilter('location', location)"
                >
                  {{ location }}
                </span>
              </div>
            </div>
  
            <!-- Around Lisbon -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Around Lisbon</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="area in filters.aroundLisbon" 
                  :key="area"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.aroundLisbon.includes(area) }"
                  @click="toggleFilter('aroundLisbon', area)"
                >
                  {{ area }}
                </span>
              </div>
            </div>
  
            <!-- Age Restriction -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Age restriction</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="age in filters.ageRestriction" 
                  :key="age"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.ageRestriction.includes(age) }"
                  @click="toggleFilter('ageRestriction', age)"
                >
                  {{ age }}
                </span>
              </div>
            </div>
  
            <!-- Opening Days -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Opening days</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="day in filters.openingDays" 
                  :key="day"
                  class="w-8 h-8 flex items-center justify-center filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.openingDays.includes(day) }"
                  @click="toggleFilter('openingDays', day)"
                >
                  {{ day }}
                </span>
              </div>
            </div>
  
            <!-- Duration -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Duration</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="duration in filters.duration" 
                  :key="duration"
                  class="px-3 py-1 rounded-full bg-white border border-gray-200 cursor-pointer hover:bg-primary hover:text-white"
                  :class="{ 'bg-primary/10': selectedFilters.duration.includes(duration) }"
                  @click="toggleFilter('duration', duration)"
                >
                  {{ duration }}
                </span>
              </div>
            </div>
  
            <!-- Language -->
            <div class="space-y-2">
  <h3 class="text-lg font-medium">Language</h3>
  <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
    <span 
      v-for="lang in filters.languages" 
      :key="lang.code"
      class="flex items-center gap-2 filter-badge"
      :class="{ 'bg-primary/10': selectedFilters.languages.includes(lang.code) }"
      @click="toggleFilter('languages', lang.code)"
    >
      <img 
        :src="`https://flagcdn.com/w320/${lang.code}.png`" 
        alt="Flag" 
        class="w-7 h-5 rounded-md object-cover"
      />
      {{ lang.name }}
    </span>
  </div>
</div>
  
            <!-- Intensity Level -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Intensity level</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="level in filters.intensity" 
                  :key="level"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.intensity.includes(level) }"
                  @click="toggleFilter('intensity', level)"
                >
                  {{ level }}
                </span>
              </div>
            </div>
  
            <!-- Food Type -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Food type</h3>
              <div class="flex flex-wrap gap-2 bg-primary-gray p-3 rounded-xl">
                <span 
                  v-for="type in filters.foodType" 
                  :key="type"
                  class="filter-badge"
                  :class="{ 'bg-primary/10': selectedFilters.foodType.includes(type) }"
                  @click="toggleFilter('foodType', type)"
                >
                  {{ type }}
                </span>
              </div>
            </div>
  
            <!-- Apply Button -->
            <button 
              class="w-full py-2 bg-primary text-white hover:bg-pink-300  rounded-lg transition-colors"
              @click="applyFilters"
            >
              Apply filters
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </template>
  
  <script setup lang="ts">
  import {SlidersHorizontal} from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

  const emit = defineEmits(['apply-filters']);
  const applyFilters = () => {
    // Emit selected filters to parent component
    emit('apply-filters', selectedFilters.value)
  }
  import { ref } from 'vue';

  const filters = {
    price: ['Free', 'Tip-based', '€', '€€', '€€€'],
    weather: ['For all weathers', 'For rainy days', 'For hot days'],
    location: ['Near me', 'Alfama', 'Avenida da Liberdade', 'Baixa', 'Beato / Marvila', 'Belém', 
               'Cais do Sodré', 'Chiado', 'Graça', 'Mouraria', 'Parque das Nações'],
    aroundLisbon: ['Cascais', 'Costa da Caparica', 'Ericeira', 'Óbidos', 'Porto', 'Sintra'],
    ageRestriction: ['Kids friendly', '+12', '+18'],
    openingDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    duration: ['<1h', '<2h', '<4h', '<8h', 'Full day'],
    languages: [
      { code: 'pt', name: 'Portuguese' },
      { code: 'gb', name: 'English' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'ru', name: 'Russian' },
      { code: 'es', name: 'Spanish' }
    ],
    intensity: ['Light', 'Medium', 'Hard'],
    foodType: [
      'portuguese', 'vegan', 'fish', 'meat', 'asian', 'italian', 'world', 'modern', 'traditional',
      'breathtaking view', 'romantic', 'kids friendly', 'fine dining', 'lunch, snacks & brunch'
    ]
  }
  
  type FilterCategories = {
  price: string[];
  weather: string[];
  location: string[];
  aroundLisbon: string[];
  ageRestriction: string[];
  openingDays: string[];
  duration: string[];
  languages: string[];
  intensity: string[];
  foodType: string[];
};

  const selectedFilters = ref<FilterCategories>({
    price: [],
    weather: [],
    location: [],
    aroundLisbon: [],
    ageRestriction: [],
    openingDays: [],
    duration: [],
    languages: [],
    intensity: [],
    foodType: []
  })
  
  const toggleFilter = (category: keyof FilterCategories, value: string) => {
  const index = selectedFilters.value[category].indexOf(value);
  if (index === -1) {
    selectedFilters.value[category].push(value);
  } else {
    selectedFilters.value[category].splice(index, 1);
  }
};
 
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
