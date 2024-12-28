<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: '50',
        delay: 100,
      },
    }"
    :class="[
      'card relative bg-white rounded-lg shadow cursor-pointer',
      variant === 'default' ? 'w-full' : 'w-[220px] h-[265px] flex-shrink-0'
    ]"
    @click="navigateToDetail"
  >
    <img :src="card.image" :alt="props.card.title" class="w-full h-40 object-cover rounded-t-lg" />
    <div class="p-2 rounded-b-lg">
      <h3 class="font-semibold text-md line-clamp-2 leading-tight">{{ props.card.title }}</h3>
      <div class="flex items-center justify-between">
        <!-- Price -->
        <p v-if="variant === 'default'" class="text-xs text-gray-500 mt-3">
          {{ props.card.price }}
        </p>

        <!-- Label with condition for 'original' -->
        <span
          v-if="card.label"
          :class="[
            'text-xs mt-3 block',
            card.label === 'original'
              ? 'bg-primary-gray flex items-center px-2 py-2 rounded-2xl font-bold'
              : 'text-gray-500'
          ]"
        >
          <template v-if="props.card.label === 'original'">
            Original
            <img src="/images/icons/filter-3.svg" alt="Stamp Icon" class="w-4 h-4 ml-1" />
          </template>
          <template v-else>
            {{ variant === 'default' ? props.card.label : 'free' }}
          </template>
        </span>
      </div>
    </div>
    <!-- Categories -->
    <div v-if="variant === 'default'" class="absolute bottom-[6.5rem] left-0 space-y-1.5">
      <span v-for="category in props.card.categories" :key="category" class="flex flex-col gap-y-3">
        <img
          v-if="category === `TOBY'S CHOICE`"
          src="/images/icons/toby-choice.svg"
          :alt="category"
          class="w-16 h-auto"
        />
        <img
          v-else-if="category === 'FOR YOU'"
          src="/images/icons/for-you.svg"
          :alt="category"
          class="w-16 h-auto"
        />
      </span>
    </div>
    <!-- Icons -->
    <div class="absolute top-2 right-2 flex items-center gap-x-2 space-y-1">
      <div
        v-for="icon in props.card.icons"
        :key="icon"
        class="flex items-center bg-primary px-2 py-1 rounded-full"
      >
        <img :src="icon" alt="label icon" class="w-4 h-4 mr-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: 'default',
  },
});

// Use Vue Router
const router = useRouter();

const navigateToDetail = () => {
  if (props.card && props.card.id) {
    router.push({ name: 'TourDetails', params: { id: props.card.id } });
  } else {
    console.warn('Card details are missing!');
  }
};
</script>
