<template>
      <!-- Sort Dropdown Button -->
      <div class="relative">
        <span @click="toggleSort" class="bg-white rounded-lg p-2 cursor-pointer flex items-center gap-x-2">
          <ArrowDownUp :size="16" />
          <span>{{ sortDirectionText }}</span>
        </span>
  
        <!-- Sort Options Dropdown -->
        <div 
          v-if="isSortedList" 
          class="absolute bg-white shadow-lg rounded-lg top-full mt-2 right-0 w-32 py-2"
        >
          <button 
            @click="sortList('asc')" 
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Ascending
          </button>
          <button 
            @click="sortList('desc')" 
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Descending
          </button>
        </div>
      </div>
  
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { ArrowDownUp } from 'lucide-vue-next'
  
  // State for controlling sorting
  const isSortedList = ref(false)
  const sortDirection = ref('asc')  // Default sorting direction
  
  // Computed text for the current sorting direction
  const sortDirectionText = computed(() => {
    return sortDirection.value === 'asc' ? 'Ascending' : 'Descending'
  })
  
  // Method to toggle dropdown visibility
  const toggleSort = () => {
    isSortedList.value = !isSortedList.value
  }
  
  // Method to handle sorting
  const sortList = (direction: string) => {
    sortDirection.value = direction
    isSortedList.value = false
    // Handle the sorting logic for your list here
    console.log(`List sorted in ${direction} order`)
  }
  </script>
  
  <style scoped>
  /* Optional: Styling for the dropdown options */
  .w-full {
    width: 100%;
  }
  
  .text-sm {
    font-size: 0.875rem;
  }
  
  .hover\:bg-gray-100:hover {
    background-color: #f7fafc;
  }
  </style>
  