<template>
    <section class="mt-5 mx-4 w-full">
      <h2 class="text-2xl font-semibold mb-2">How to move around</h2>
      <div class="flex space-x-4 overflow-x-auto">
        <div
          v-for="location in locations"
          :key="location.name"
          class="text-center cursor-pointer"
        >
          <router-link
            :to="`/explore?location=${location.name.toLowerCase()}`"
            class="block"
          >
            <img
              :src="location.image"
              :alt="location.name"
              class="w-full object-contain h-36 rounded-lg shadow"
            />
            <p class="mt-2 text-sm font-semibold">{{ location.name }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        locations: [
          { name: "Lisbon", image: "/images/lisbon.png" },
          { name: "Sintra", image: "/images/sintra.png" },
          { name: "Belem", image: "/images/belem.png" },
        ],
      };
    },
  };
  </script>
  