<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)" class="!h-auto">
      <DialogContent class="h-auto bg-white top-[80%]  rounded-t-[32px] border-0 p-0 pb-7">
        <div class="relative flex flex-col w-full items-center">
          <div class="flex w-full items-center justify-between p-6 pb-4">
            <DialogTitle class="text-xl font-medium pt-3">{{ title }}</DialogTitle>
            <DialogClose class="absolute right-5 top-3 rounded-full  hover:bg-gray-100">
              <XIcon class="h-6 w-6" />
            </DialogClose>
          </div>
          <div class="px-6 pb-6 w-full">
            <slot />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog'
  import { XIcon } from 'lucide-vue-next'
  
  defineProps<{
    open: boolean
    title: string
  }>()
  
  defineEmits<{
    'update:open': [value: boolean]
  }>()
  </script>