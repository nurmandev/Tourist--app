<template>
  <div class="space-y-4">
    <div v-for="section in safeAdditionalInfo" :key="section.title">
      <button 
        @click="openSheet(section.title)"
        class="flex w-full items-center bg-white rounded-lg p-4 justify-between mb-3"
      >
      <h2 class="text-lg font-semibold">{{ section.title }}</h2>
      <ChevronRight />
        
      </button>

      <!-- Bottom Sheet -->
      <Teleport to="body">
        <template v-if="activeSection === section.title">
          <div 
            class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            @click="closeSheet"
          ></div>
          
          <div 
            class="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out"
            :class="[
              isOpen ? 'translate-y-0' : 'translate-y-full',
              'bg-white dark:bg-gray-900 rounded-t-xl'
            ]"
          >
            <div class=" h-auto max-h-[65vh] overflow-hidden flex flex-col">
              <!-- Header -->
              <div class="relative p-4 border-b">
                <h2 class="text-xl font-semibold pr-8">
                  {{ section.title }}
                </h2>
                <button 
                  @click="closeSheet"
                  class="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <XIcon class="h-4 w-4" />
                  <span class="sr-only">Close</span>
                </button>
              </div>

              <!-- Content -->
              <div class="flex-1 overflow-y-auto p-4">
                <div class="space-y-3">
                  <p 
                    v-for="(item, index) in section.items" 
                    :key="index"
                    class="leading-relaxed text-[1.1rem]"
                  >
                    {{ item }}
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div class="p-4 border-t bg-white dark:bg-gray-900">
                <button 
                  @click="closeSheet"
                  class="w-full bg-primary hover:bg-pink-600 text-white py-3 px-4 rounded-2xl font-medium transition-colors"
                >
                  Okay, got it
                </button>
              </div>
            </div>
          </div>
        </template>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted, computed } from 'vue'
import { ChevronRight, XIcon } from 'lucide-vue-next'

// Props definition
const props = defineProps({
  additionalInfo: {
    type: Array,
    required: true,
    default: () => [],
  }
})

// Computed property to safely handle additionalInfo
const safeAdditionalInfo = computed(() => {
  if (Array.isArray(props.additionalInfo)) {
    return props.additionalInfo.filter(item => 
      typeof item === 'object' && 
      typeof item.title === 'string' && 
      Array.isArray(item.items)
    )
  }
  return []
})

// State
const activeSection = ref(null)
const isOpen = ref(false)

// Methods
const openSheet = async (title) => {
  activeSection.value = title
  // Wait for the DOM to update before showing the animation
  await nextTick()
  isOpen.value = true
  // Prevent body scroll when sheet is open
  document.body.style.overflow = 'hidden'
}

const closeSheet = () => {
  isOpen.value = false
  // Wait for close animation to finish
  setTimeout(() => {
    activeSection.value = null
    document.body.style.overflow = ''
  }, 300)
}

// Clean up when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Optional: Add smooth scrolling to the content */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}
</style>