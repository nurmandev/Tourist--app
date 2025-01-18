<template>
  <Drawer class="space-y-4">
    <div v-for="section in safeAdditionalInfo" :key="section.title">
      <DrawerTrigger class="w-full">
        <button
          @click="openSheet(section.title)"
          class="flex w-full items-center bg-white rounded-lg p-4 justify-between mb-3"
        >
          <h2 class="text-lg font-semibold">{{ section.title }}</h2>
          <ChevronRight />
        </button>
      </DrawerTrigger>
      <!-- Conditionally Render Bottom Sheet -->
      <div v-if="activeSection === section.title">
        <BottomSheet
          :title="section.title"
        >
          <div class="space-y-3">
            <p
              v-for="(item, index) in section.items"
              :key="index"
              class="leading-relaxed text-[1.1rem]"
            >
              {{ item }}
            </p>
          </div>
        </BottomSheet>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronRight } from 'lucide-vue-next';
import BottomSheet from './bottom-sheet.vue';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';

interface AdditionalInfoSection {
  title: string;
  items: string[];
}

const props = defineProps<{
  additionalInfo: AdditionalInfoSection[];
}>();

// State
const activeSection = ref<string | null>(null);

// Methods
const openSheet = (title: string) => {
  activeSection.value = title;
};

// Validate additionalInfo
const safeAdditionalInfo = computed<AdditionalInfoSection[]>(() =>
  Array.isArray(props.additionalInfo)
    ? props.additionalInfo.filter(
        (item) =>
          typeof item === 'object' &&
          typeof item.title === 'string' &&
          Array.isArray(item.items)
      )
    : []
);
</script>
