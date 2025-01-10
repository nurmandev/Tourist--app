<template>
  
        <div class="flex flex-col gap-y-5 items-center justify-center xsm:h-full lg:h-full h-full mt-10  text-center px-2">
            <Card class="pt-7 px-0">
                <CardContent>
      <!-- Celebration Icon -->
      <div class="text-yellow-500 text-6xl mb-5">
        🎉
      </div>
  
      <!-- Title -->
      <h1 class="text-2xl font-medium text-gray-900 mt-4">
        Whoo hoo, here you go!
      </h1>
  
      <!-- Message -->
      <p class="text-gray-500 mt-2 text-sm">
        An e-mail with your purchase <span class="font-medium text-gray-700">1234</span> is being cooked
        and'll be sent to <span class="font-semibold text-gray-800"> {{ userEmail || 'mynamelisa@gmail.com' }} </span>.
      </p>
  
      <!-- Dashed Line and Heart Icon -->
      <div class="flex items-center mt-5 w-full max-w-xs">
        <!-- Dashed Line (Left) -->
        <div class="border-t-2 border-dashed border-gray-300 flex-grow"></div>
  
        <!-- Heart Icon -->
        <img
          src="/images/icons/yellow-heart.png"
          alt="Yellow Heart"
          class="mx-4 w-8 h-8"
        />
  
        <!-- Dashed Line (Right) -->
        <div class="border-t-2 border-dashed border-gray-300 flex-grow"></div>
      </div>
  
      <!-- Footer Message -->
      <p class="font-medium mt-4">
        Thanks for this, we really appreciate it!
      </p>
    </CardContent>
    </Card>
    <a href="/" class=" h-12 flex items-center justify-center rounded-2xl border-2 border-gray-600 w-full hover:bg-white mt-10">
      Go Back
    </a>
    </div>
  </template>

  <script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
  import CardContent from '@/components/ui/card/CardContent.vue';
  import confetti from 'canvas-confetti';
  import { onMounted, ref } from 'vue';

const userEmail = ref('');
  
  onMounted(() => {
    userEmail.value = localStorage.getItem('userEmail') || '';
    // Trigger confetti animation
    confetti({
      particleCount: 100, // Number of confetti pieces
      spread: 70,         // Spread angle
      origin: { y: 0.6 }, // Starting point on the page.
      colors: ['#FFC107', '#FF4081', '#03A9F4'], 
    });

    const duration = 3000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);
  });
  </script>