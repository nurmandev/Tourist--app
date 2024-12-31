<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<RangeCalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarCell
    :class="cn('relative h-9 w-[2.7rem] mx-auto p-0  text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-pink-200 first:[&:has([data-selected])]:rounded-l-full last:[&:has([data-selected])]:rounded-r-full [&:has([data-selected][data-outside-view])]:bg-accent/50 [&:has([data-selected][data-selection-end])]:rounded-r-full [&:has([data-selected][data-selection-start])]:rounded-l-full', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCell>
</template>
