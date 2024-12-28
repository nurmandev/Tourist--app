<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps<{ open: boolean }>();
defineEmits(['update:open']);

const timeLeft = ref(300);
const radius = 46;
const circumference = 2 * Math.PI * radius;

const strokeDashoffset = computed(() => 
  circumference * (1 - timeLeft.value / 300)
);

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

let interval: number;

onMounted(() => {
  interval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(interval);
      router.push('/success');
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <Dialog :open="open" 
  @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[320px] rounded-2xl p-0">
      <div class="py-6 flex flex-col items-center">
        <div class="relative w-32 h-32">
          <svg viewBox="0 0 100 100" class="transform rotate-90 w-full h-full">
            <circle
              cx="50"
              cy="50"
              :r="radius"
              fill="none"
              stroke="#f3f4f6"
              stroke-width="4"
            />
            <circle
              cx="50"
              cy="50"
              :r="radius"
              fill="none"
              stroke="#ff1493"
              stroke-width="4"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              class="transition-all duration-1000"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-3xl font-bold">{{ formattedTime }}</span>
          </div>
        </div>
        
        <p class="mt-6 text-center text-gray-700">
          Open your MBWay app and finish the payment.<br>
          <span class="font-semibold">Hurry up, you only got 5min!</span>
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>