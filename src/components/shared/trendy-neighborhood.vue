<template>
    <section class="mt-5 w-full">
      <h2 class="text-2xl font-medium mb-4">Trendy neighborhoods</h2>
      <div class="relative rounded-lg">
        <!-- Map -->
        <img
          src="/images/Map.png"
          alt="Map"
          class="w-full rounded-t-lg cursor-pointer"
          @click="toggleView"
        />
  
        <!-- List View -->
        <div v-if="isListView" @click="toggleView" class="p-4 bg-white cursor-pointer border-b-rounded-lg">
          <ul class="space-y-5 py-3">
            <li
              v-for="(neighborhood, index) in neighborhoods"
              :key="index"
              class="flex gap-x-2 gap-y-3 border-b-2 border-dashed pb-5"
            >
              <span class="bg-[#1d0387] p-1 px-2 font-bold h-8 rounded-lg text-white">{{ index + 1 }}</span>
              <span>
                <h3 class="font-semibold">{{ neighborhood.name }}</h3>
                <p class="text-gray-700">{{ neighborhood.description }}</p>
              </span>
            </li>
          </ul>
        </div>
  
        <!-- Card View -->
        <div v-else class="pt-4  overflow-x-auto no-scrollbar pb-3">
          <div class="flex gap-4">
            <div
              v-for="(neighborhood, index) in neighborhoods"
              :key="index"
              class="w-[220px] relative flex-shrink-0 bg-white rounded-lg shadow-sm"
            >
              <img :src="neighborhood.image" alt="Neighborhood Image" class="w-full h-40 object-cover rounded-t-lg" />
              <div class="px-3 pb-2">
                <span
                  class="bg-[#1d0387] absolute top-2 text-white font-bold px-2 py-1 rounded"
                  >{{ index + 1 }}</span
                >
                <div class="absolute right-2 top-2 flex items-center bg-primary p-2 rounded-md" >
                <img src="/images/icons/building.svg" alt="label icon" class="size-full" />
            </div>
                <h3 class="font-semibold mt-2">{{ neighborhood.description }}</h3>
                <p class="mt-5 text-gray-500">free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";

  interface Neighborhood {
    name: string;
    description: string;
    image: string;
  }
  
  export default defineComponent({
    name: "TrendyNeighborhoods",
    setup() {
      const isListView = ref<boolean>(true); 
      const neighborhoods = ref<Neighborhood[]>([
        {
          name: "Príncipe Real",
          description:
            "Feel the best vibe in Príncipe Real",
          image: "/images/map-card-1.png",
        },
        {
          name: "Bairro Alto",
          description:
            "Experience life at historical Bairro Alto",
          image: "/images/map-card-2.png",
        },
        {
          name: "Chiado",
          description:
            "Experience Chiado known for its shopping.",
          image: "/images/map-card-3.png",
        },
        {
          name: "Baixa",
          description:
            " Baixa known for its commercial streets.",
          image: "/images/map-card-4.png",
        },
        {
          name: "Alfama",
          description:
            "Alfama delightful maze of traditional houses.",
          image: "/images/map-card-5.png",
        },
      ]);

      const toggleView = (): void => {
        isListView.value = !isListView.value;
      };
  
      return {
        isListView,
        neighborhoods,
        toggleView,
      };
    },
  });
  </script>
  
  <style>
  /* Add horizontal scroll for cards */
  .overflow-x-auto {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  
  .overflow-x-auto > * {
    scroll-snap-align: start;
  }
  </style>
  