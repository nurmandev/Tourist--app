<template>
    <div class="space-y-4 pb-9">
      <button
        v-for="language in languages"
        :key="language.code"
        class="w-full p-4 py-5 flex items-center gap-3 rounded-lg border shadow-md hover:bg-primary hover:text-white"
        :class="{ 'bg-primary text-white': modelValue?.code === language.code }"
        @click="selectLanguage(language)"
      >
        <img
          :src="`https://flagcdn.com/w320/${language.code}.png`"
          :alt="`${language.name} flag`"
          class="w-6 h-6 rounded-full object-cover"
        />
        <span class="font-medium">{{ language.name }}</span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Language } from '@/types'
  
   defineProps<{
    modelValue: Language | null
  }>()
  
  const emit = defineEmits<{
    'update:modelValue': [value: Language]
    'close': []
  }>()
  
  const languages: Language[] = [
    { code: 'pt', name: 'Portuguese' },
    { code: 'gb', name: 'English' },
    { code: 'it', name: 'Italian' }
  ]
  
  const selectLanguage = (language: Language) => {
    emit('update:modelValue', language)
    emit('close')
  }
  </script>