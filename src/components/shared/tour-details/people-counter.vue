<template>
    <div class="flex items-center justify-center gap-4 ">
      <Button
        variant="outline"
        size="icon"
        class="h-12 w-12 rounded-lg shadow-lg"
        :disabled="modelValue <= 1"
        @click="updateValue(modelValue - 1)"
      >
        <MinusIcon class="h-6 w-6" />
      </Button>
      
      <span class="text-4xl font-medium w-12 text-center">
        {{ modelValue }}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        class="h-12 w-12 rounded-lg shadow-lg"
        :disabled="modelValue >= 10"
        @click="updateValue(modelValue + 1)"
      >
        <PlusIcon class="h-6 w-6" />
      </Button>
     
    </div>
    <Button @click="saveValue(modelValue)" class="w-full mt-10 h-14">
        Save
      </Button>
  </template>
  
  <script setup lang="ts">
  import { Button } from '@/components/ui/button'
  import { MinusIcon, PlusIcon } from 'lucide-vue-next'
  
  defineProps<{
    modelValue: number
  }>()
  
  const emit = defineEmits<{
    'update:modelValue': [value: number],
    'close': []
  }>()
  
  const updateValue = (value: number) => {
    emit('update:modelValue', value)
    //emit('close');
  }
  const saveValue = (value: number) => {
    emit('update:modelValue', value)
    emit('close');
  }
  </script>