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
        duration: 500,
      },
    }"
  >
      <header class=" py-2 bg-no-repeat">
          <BackButton />
          <h1 class="text-xl font-medium my-5">Book an experience</h1>
      </header>
      <div class="space-y-3">
          <div class="flex gap-2">
              <Button variant="outline" class="flex-1 h-12 justify-start">
                  <CalendarIcon class="h-5 w-5 mr-2" />
                  {{ bookingData.selectedDates }}
              </Button>

              <Button variant="outline" class="h-12">
                  <Users2Icon class="h-5 w-5 mr-2" />
                  x {{ bookingData.people }}
              </Button>
          </div>

          <Button v-if="bookingData?.selectedLanguage?.name" variant="outline" class="w-full h-12 justify-start">
              <img
                  :src="`https://flagcdn.com/w320/${bookingData?.selectedLanguage?.code}.png`"
                  :alt="`${bookingData?.selectedLanguage?.name} flag`"
                  class="w-6 h-4 rounded-sm object-cover"
              />
              {{ bookingData?.selectedLanguage?.name }}
          </Button>
      </div>

      <div class="mt-5">
          
        <div v-for="(date, index) in formattedDates" :key="date.fullDate" class="py-2">
          <h2 class="text-lg font-bold text-gray-800 mb-4">{{ date.monthName }} {{ date.day }}</h2>
  <!-- Food Tour Card -->
  <div
    class="bg-white rounded-lg shadow-sm p-6 border transition-all"
    :class="{
      'border-primary': activeIndex === index,
      'border-gray-200': activeIndex !== index
    }"
  >
    <h3 class="text-lg font-bold text-gray-800 mb-2">Food Tour</h3>
    <span class="text-sm mt-2 font-medium flex items-center gap-x-2">
      <img src="/images/icons/hourglass.svg" alt="hourglass"/>3h30
    </span>
    <span class="text-sm mt-2 font-medium flex items-center gap-x-2">
      <img src="/images/icons/airport-location.svg" alt="hourglass"/>Treasures of Lisboa Food Tours
    </span>

    <!-- Time Slot Buttons -->
    <div class="flex gap-x-3 items-center mt-4">
      <button
        v-for="slot in timeSlots"
        :key="slot.time"
        @click="handleTimeSlotClick(index, slot, date.fullDate)"
        class="px-3 py-2 border hover:border-primary rounded-3xl font-medium text-sm transition-all"
        :class="{
          'border-primary text-primary': isSlotActive(slot, date.fullDate) && activeIndex === index,
          'bg-white shadow-md': !isSlotActive(slot, date.fullDate) || activeIndex !== index
        }"
      >
        {{ slot.time }}
      </button>
    </div>

    <!-- Cancellation Policy -->
    <p class="text-sm  mt-4">
      Cancel before 10:00 on {{ date.day }} and we'll reimburse you.
    </p>

    <!-- Total Cost -->
    <div class="flex flex-col gap-y-2 justify-end items-end mt-6 border-t-2 border-dashed pt-4">
      <span class="text-sm text-gray-600">
        {{ bookingData.people }} × 160,00€
      </span>
      <p class="font-bold text-gray-800">
        <span class="text-sm font-normal text-gray-800">Total</span> {{ bookingData.people * 160 }},00€
      </p>
    </div>

    <!-- Book Now Button -->
    <Button
      v-if="activeIndex === index"
      @click="router.push('/checkout')"
      class="w-full bg-primary mx-auto mt-8 text-white rounded-lg py-2 font-medium hover:bg-pink-600 transition-all"
    >
      Let's go, book now!
    </Button>
  </div>
</div>

      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CalendarIcon, Users2Icon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import BackButton from '@/components/shared/back-button.vue';
import { parseDate } from '@/lib/date';

const router = useRouter();

// Booking data
const bookingData = ref({
  selectedDates: '12/30 - 1/1', // Example date range
  people: 2,
  selectedLanguage: { code: 'gb', name: 'English' }
});

// Time slots with selected dates tracking
const timeSlots = ref([
  { time: '10:00' },
  { time: '15:00' },
  { time: '16:30' }
]);

// Store selected time slots for each date
const selectedTimeSlots = ref<Record<string, string>>({});
  const activeIndex = ref<number | null>(null);
// Function to parse date string and return Date object


// Format dates for display
const formattedDates = computed(() => {
  const [startStr, endStr] = bookingData.value.selectedDates.split(' - ');
  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);

  const dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push({
      fullDate: currentDate.toISOString().split('T')[0],
      day: currentDate.getDate(),
      monthName: currentDate.toLocaleString('default', { month: 'long' }) // Use 'long' here
    });
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return dates;
});


// Function to handle time slot selection
const handleTimeSlotClick = (index: number, slot: { time: string }, date: string) => {
  activeIndex.value = index; // Set the active index
  selectedTimeSlots.value[date] = slot.time; // Track the selected time slot
};

// Check if a specific slot is active for a specific date
const isSlotActive = (slot: { time: string }, date: string) => {
  return selectedTimeSlots.value[date] === slot.time;
};

onMounted(() => {
  const storedData = localStorage.getItem('bookingData');
  if (storedData) {
      bookingData.value = JSON.parse(storedData);
  }
});
</script>