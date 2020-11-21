<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from '@/components/layout/Navigation.vue'

export default defineComponent({
  components: {
    Navigation,
  },
})
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100">
    <Navigation />
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
