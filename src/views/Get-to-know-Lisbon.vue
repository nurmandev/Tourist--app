<script setup lang="ts">
import Card from '@/components/shared/card.vue';
import { defineProps } from 'vue';

interface CardType {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
}


const props = defineProps<{
  cardlist: CardType[];
}>();


const sections = [
  { title: 'Viewpoints', key: 'viewpoints' },
  { title: 'Neighborhoods', key: 'neighborhoods' },
  { title: 'Parks & Gardens', key: 'parks' },
];
</script>

<template>
  <div>
  
    <div class="flex items-center justify-between max-w-full w-full rounded-lg bg-[#ededed] gap-x-4 px-3 py-4 mb-8">
      <div class="w-[80%] leading-tight text-sm">
        Lisbon is known for its charming old neighborhoods, old-fashioned trams, nice food, and rich history.
        <a href="/explore-lisbon" class="text-primary cursor-pointer font-semibold">Explore more</a>
      </div>
      <p class="text-[2.5rem]">🤩</p>
    </div>

    <div v-for="section in sections" :key="section.key" class="">
      <div class="flex items-center justify-between ">
        <p class="text-md font-medium">{{ section.title }}</p>
        <a href="/discover" class="text-sm cursor-pointer text-primary font-semibold">Discover More</a>
      </div>
      <div class="flex w-full items-center overflow-x-scroll no-scrollbar gap-3 gap-x-2 mt-4 pb-3">
        <Card
          v-for="card in props.cardlist"
          :key="card.id"
          :card="card"
          variant="getToKnow"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
