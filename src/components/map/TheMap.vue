<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { setupMap } from '@/hooks/useMap'

export default defineComponent({
  setup() {
    onMounted(() => {
      setupMap('map')
    })
  },
})
</script>

<template>
  <div class="h-full w-full">
    <div id="map" class="h-screen w-full z-40 relative"></div>
  </div>
</template>

<style lang="postcss" scoped>
@import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
</style>
