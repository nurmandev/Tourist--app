<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
  <div class="flex flex-col items-center justify-center h-[82vh] ">
    <div class="relative w-36 h-36">
      <svg viewBox="0 0 100 100" class="transform  w-full h-full">
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="none"
          stroke="#F0F0F0"
          stroke-width="5"
        />
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="none"
          stroke="#FD226E"
          stroke-width="5"
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
    
    <p class="mt-6 text-center">
      Open your MBWay app and finish the payment.<br>
      <span class="font-semibold">Hurry up, you only got 5min!</span>
    </p>
  </div>
</template>
