<script lang="ts">
import { defineComponent } from 'vue'

const validator = (value: string) => ['button', 'reset', 'submit'].includes(value)

const validateVariant = (value: string) => ['primary', 'secondary', 'light'].includes(value)

export default defineComponent({
  props: {
    variant: { default: 'light', required: true, validator: validateVariant },
    label: { type: String, required: true },
    type: { type: String, required: true, validator },
    disabled: { default: false },
  },
})
</script>

<template>
  <button
    :type="type"
    class="h-12 px-4 rounded-lg focus:ring ring-green-500 font-bold transition border border-transparent focus:outline-none"
    :class="{
      'shadow-sm hover:shadow-md active:shadow-sm': variant !== 'light',
      'bg-green-500 text-white active:bg-green-700 hover:bg-green-600': variant === 'primary',
      'bg-green-100 border-green-500 text-green-500 active:bg-green-700 hover:bg-green-600 hover:text-white':
        variant === 'secondary',
      'bg-white text-gray-800 hover:shadow-none hover:border-gray-200': variant === 'light',
    }"
  >
    {{ label }}
  </button>
</template>
