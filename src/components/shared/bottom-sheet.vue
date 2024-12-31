<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)" class="!h-auto">
      <DialogContent class="h-auto bg-white top-[80%]  rounded-t-[32px] border-0 px-0 pb-7">
        <div class="relative flex flex-col w-full items-center">
          <div class="flex w-full items-center justify-between p-6 pb-4">
            <DialogTitle class="text-xl font-medium pt-3">{{ title }}</DialogTitle>
           
          </div>
          <div class="px-4 pb-6 w-full">
            <slot />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
  
  defineProps<{
    open: boolean
    title: string
  }>()
  
  defineEmits<{
    'update:open': [value: boolean]
  }>()
  </script>