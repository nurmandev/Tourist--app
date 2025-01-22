<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; 
import { CalendarIcon, Users2Icon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import BottomSheet from '../bottom-sheet.vue';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import PeopleCounter from './people-counter.vue';
import LanguageSelector from './language-selector.vue';
import DatePicker from './date-picker.vue';

interface Language {
  code: string;
  name: string;
}


const isSheetOpen = ref<boolean>(false);
const activeSheet = ref<'date' | 'people' | 'language' | null>(null);
const selectedDates = ref<string | null>(null);
const people = ref<number>(2);
const selectedLanguage = ref<Language | null>(null);

const sheetTitles: Record<'date' | 'people' | 'language', string> = {
  date: 'Choose a date to go',
  people: "Choose the number of people you'll bring with you",
  language: 'Choose the language',
};

const isValid = computed<boolean>(() => 
  !!selectedDates.value && people.value > 0
);

const openSheet = (sheet: typeof activeSheet.value): void => {
  activeSheet.value = sheet;
  isSheetOpen.value = true;
};

const closeSheet = (): void => {
  isSheetOpen.value = false;
  activeSheet.value = null;
};

const router = useRouter();

const handleCheckAvailability = (): void => {
  if (isValid.value) {
    const data = {
      selectedDates: selectedDates.value,
      people: people.value,
      selectedLanguage: selectedLanguage.value,
    };
    localStorage.setItem('bookingData', JSON.stringify(data));
    router.push('/bookings'); // Navigate to the result page
  }
};
</script>

<template>
  <Drawer class="space-y-4">
    <div class="bg-white rounded-xl py-5 px-3 mt-5">
      <h3 class="font-medium">Ready? Let's roll!</h3>
      <div  class="mt-4 space-y-3">
        <div class="flex w-full gap-2">
          <DrawerTrigger class="w-full ">
            <Button
              variant="outline"
              class="flex-1 h-12 w-full justify-start"
              :class="{ 'opacity-50': !selectedDates }"
              @click="openSheet('date')"
            >
              <CalendarIcon class="h-5 w-5 mr-2" />
              {{ selectedDates || 'Choose a date' }}
            </Button>
          </DrawerTrigger>
          
          <DrawerTrigger class="w-1/3">
            <Button
              variant="outline"
              class="h-12 "
              :class="{ 'opacity-50': !people }"
              @click="openSheet('people')"
            >
              <Users2Icon class="h-5 w-5 mr-2" />
              x {{ people || '0' }}
            </Button>
          </DrawerTrigger>
        </div>

        <DrawerTrigger class="w-full">
          <Button
            variant="outline"
            class="w-full h-12 justify-start"
            :class="{ 'opacity-80': !selectedLanguage }"
            @click="openSheet('language')"
          >
          <img
          :src="`https://flagcdn.com/w320/${selectedLanguage?.code || 'pt'}.png`"
          :alt="`${selectedLanguage?.name} flag`"
          class="size-5 rounded-md object-cover"
        />
            {{ selectedLanguage?.name || 'Portuguese' }}
          </Button>
        </DrawerTrigger>

        <Button
          class="w-full h-12"
          :disabled="!isValid"
          @click="handleCheckAvailability"
        >
          Check availability
        </Button>
      </div>
    </div>

    <!-- Bottom Sheet inside Drawer -->
    <div v-if="isSheetOpen">
      <BottomSheet :title="activeSheet ? sheetTitles[activeSheet] : ''" @close="closeSheet">
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
    </div>
  </Drawer>
</template>

