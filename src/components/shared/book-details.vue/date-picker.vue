<template>
  <div class="py-4 space-y-4 pb-[19rem]">
    <div class="flex gap-2">
      <button
        :class="activeOption === 'Next 2 Days' ? 'bg-primary text-white' : 'bg-white shadow-lg hover:bg-primary hover:text-white'"
        @click="setActiveOption('Next 2 Days', selectNext2Days)"
        class="p-2 text-sm rounded-2xl"
      >
        Next 2 Days
      </button>
      <button
        :class="activeOption === 'This Week' ? 'bg-primary text-white' : 'bg-white shadow-lg  hover:bg-primary hover:text-white'"
        @click="setActiveOption('This Week', selectThisWeek)"
        class="p-2 py-1 text-sm rounded-2xl"
      >
        This Week
      </button>
      <button
        :class="activeOption === 'This Weekend' ? 'bg-primary text-white' : 'bg-white shadow-lg hover:bg-primary hover:text-white'"
        @click="setActiveOption('This Weekend', selectThisWeekend)"
        class="p-2 text-sm rounded-2xl"
      >
        This Weekend
      </button>
    </div>

    <RangeCalendar
      v-model="value"
      @select="handleDateSelection"
      class="rounded-md !w-full"
    />
    <Button class="w-full h-14" @click="confirm">
      Save
    </Button>

    <div class="mt-4 text-sm">
      <p>
        From:
        <span class="font-semibold">{{ value.start ? value.start.toString() : 'Not selected' }}</span>
        To:
        <span class="font-semibold">{{ value.end ? value.end.toString() : 'Not selected' }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DateRange } from 'radix-vue';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Button } from '@/components/ui/button';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { ref, type Ref} from 'vue';

// Initialize date range
const start = today(getLocalTimeZone());
const value = ref<DateRange>({ start, end: start }) as Ref<DateRange>;
const activeOption = ref<string>(''); // Tracks the active range button

  const emit = defineEmits<{
  'update:modelValue': [value: string]
  'close': []
}>()
// Utility function to format dates
const formatDate = (date: any) => `${date.month}/${date.day}`;

// Predefined range selectors
const selectNext2Days = () => (value.value = getRange(0, 2));
const selectThisWeek = () => {
  const startOfWeek = today(getLocalTimeZone());
  value.value = { start: startOfWeek, end: startOfWeek.add({ days: 7 }) };
};
const selectThisWeekend = () => {
  const startOfWeekend = today(getLocalTimeZone());
  value.value = { start: startOfWeekend, end: startOfWeekend.add({ days: 1 }) };
};

// Utility to calculate date ranges
const getRange = (startDays: number, endDays: number) => ({
  start: today(getLocalTimeZone()).add({ days: startDays }),
  end: today(getLocalTimeZone()).add({ days: endDays }),
});

// Handle manual date selection
const handleDateSelection = (selectedDate: CalendarDate) => {
  const { start, end } = value.value;
  if (!start || (start && end)) {
    value.value.start = selectedDate;
    value.value.end = selectedDate;
  } else {
    value.value.end = selectedDate;
    if (value.value.start as any > value.value.end) {
      [value.value.start, value.value.end] = [value.value.end, value.value.start];
    }
  }
};

// Set active button and apply range
const setActiveOption = (option: string, range: () => void) => {
  activeOption.value = option;
  range();
};

// Confirm selected date range
const confirm = () => {
  const { start, end } = value.value;
  if (start && end) {
    const formatted = `${formatDate(start)} - ${formatDate(end)}`;
    emit('update:modelValue', formatted);
    emit('close');
  }
};
</script>
