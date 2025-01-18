<template>
    
      <DrawerContent class=" bg-white rounded-t-[32px] border-0 ">
        <div class="relative flex flex-col w-full items-center  h-auto max-h-[85vh] no-scrollbar overflow-y-scroll">
          <div class="flex w-full items-center justify-between p-6 pb-4">
            <DrawerTitle class="text-2xl font-medium pt-3">{{ title }}</DrawerTitle>
           
          </div>
          <div class="px-4 pb-6 w-full">
            <slot />
          </div>
        </div>
        <DrawerClose as-child @click="$emit('close')">
            <span  class="absolute cursor-pointer size-8 top-4 right-5 bg-white">
              <X />
            </span>
          </DrawerClose>
      </DrawerContent>
   
  </template>
  
  <script setup lang="ts">
  import {  DrawerContent, DrawerTitle, DrawerClose } from '@/components/ui/drawer';
  import { X } from 'lucide-vue-next';
  defineProps<{
    open?: boolean
    title?: string
  }>()
  
  defineEmits<{
    'update:open': [value: boolean]
    'close': []
  }>()
  
  </script>