<script setup lang="ts">
import { Input } from '@/components/ui/input'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  label: string
  class?: HTMLAttributes['class']
  type?: string
  maxlength?: string | number
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const inputValue = ref(props.modelValue ?? '')
const isFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// Update local value when prop changes
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue ?? ''
})

// Emit changes when local value changes
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const isFloating = computed(() => {
  return isFocused.value || (inputValue.value && inputValue.value.toString().length > 0)
})

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <div class="w-full">
    <div 
      class="relative"
      @click="focusInput"
    >
      <Input
        ref="inputRef"
        v-model="inputValue"
        :type="type"
        :maxlength="maxlength"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="cn(
          ' px-4 pt-[1.4rem] h-14 rounded-xl shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 caret-primary',
          { 'border-red-500': error },
          props.class
        )"
      />
      <label
        :class="cn(
          'absolute left-3 top-1/4 transition-all duration-200 pointer-events-none',
          isFloating ? 'transform -translate-y-3 scale-[.83] text-[1rem]' : 'translate-y-0 scale-[.95]',
          error ? 'text-red-500' : (isFloating ? 'text-[#6B6767]' : 'text-muted-foreground')
        )"
      >
        {{ label }}
      </label>
    </div>
    <span v-if="error" class="text-sm text-red-500 mt-1 block">{{ error }}</span>
  </div>
</template>