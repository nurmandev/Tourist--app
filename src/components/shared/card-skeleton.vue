<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="card relative bg-white rounded-lg shadow">
    <Skeleton class="w-full h-40 rounded-t-lg" />
    <div class="p-2 rounded-b-lg">
      <Skeleton class="h-4 w-3/4 mb-2" />
      <Skeleton class="h-3 w-1/2" />
    </div>
  </div>
</template>