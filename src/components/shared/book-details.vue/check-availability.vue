<template>
  <div class="bg-white rounded-xl py-5 px-3 mt-5">
    <h3 class="font-medium">Ready? Let's roll!</h3>
    
    <div v-if="!isExpanded" class="mt-4">
      <Button
        class="w-full flex items-center justify-center gap-x-3 h-12"
        @click="expand"
      >
        <SquareArrowOutUpRight class="h-5 w-5" />
        Check availability
      </Button>
    </div>

    <div v-else class="mt-4 space-y-3">
      <div class="flex gap-2">
        <Button
          variant="outline"
          class="flex-1 h-12 justify-start"
          :class="{ 'opacity-50': !selectedDates }"
          @click="openSheet('date')"
        >
          <CalendarIcon class="h-5 w-5 mr-2" />
          {{ selectedDates || 'Choose a date' }}
        </Button>
        
        <Button
          variant="outline"
          class="h-12"
          :class="{ 'opacity-50': !people }"
          @click="openSheet('people')"
        >
          <Users2Icon class="h-5 w-5 mr-2" />
          x {{ people || '0' }}
        </Button>
      </div>

      <Button
        variant="outline"
        class="w-full h-12 justify-start"
        :class="{ 'opacity-50': !selectedLanguage }"
        @click="openSheet('language')"
      >
        <Globe2Icon class="h-5 w-5 mr-2" />
        {{ selectedLanguage?.name || 'Choose language' }}
      </Button>

      <Button
        class="w-full h-12"
        :disabled="!isValid"
        @click="handleCheckAvailability"
      >
        Check availability
      </Button>
    </div>
  </div>

  <BottomSheet
    v-model:open="isSheetOpen"
    :title="activeSheet ? sheetTitles[activeSheet] : ''"
  >
    <DatePicker
      v-if="activeSheet === 'date'"
      v-model="selectedDates"
      @close="closeSheet"
    />
    <PeopleCounter
      v-if="activeSheet === 'people'"
      v-model="people"
      @close="closeSheet"
    />
    <LanguageSelector
      v-if="activeSheet === 'language'"
      v-model="selectedLanguage"
      @close="closeSheet"
    />
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // For navigation to result page
import { SquareArrowOutUpRight, CalendarIcon, Users2Icon, Globe2Icon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import PeopleCounter from './people-counter.vue'
import LanguageSelector from './language-selector.vue'
import DatePicker from './date-picker.vue'
import BottomSheet from '../bottom-sheet.vue'

interface Language {
  code: string
  name: string
}

const isExpanded = ref(false)
const isSheetOpen = ref(false)
const activeSheet = ref<'date' | 'people' | 'language' | null>(null)
const selectedDates = ref<string | any>(null)
const people = ref<number>(2)
const selectedLanguage = ref<Language | null>(null)

const sheetTitles = {
  date: 'Choose a date to go',
  people: "Choose the number of people you'll bring with you",
  language: 'Choose the language'
}

const isValid = computed(() => 
  selectedDates.value && 
  people.value > 0 && 
  selectedLanguage.value
)

const expand = () => {
  isExpanded.value = true
}

const openSheet = (sheet: typeof activeSheet.value) => {
  activeSheet.value = sheet
  isSheetOpen.value = true
}

const closeSheet = () => {
  isSheetOpen.value = false
  activeSheet.value = null
}

const router = useRouter()

  const handleCheckAvailability = () => {
  if (isValid.value) {
    const data = {
      selectedDates: selectedDates.value,
      people: people.value,
      selectedLanguage: selectedLanguage.value
    }
    localStorage.setItem('bookingData', JSON.stringify(data))
    router.push('/bookings') // Navigate to the result page
  }
}
</script>
