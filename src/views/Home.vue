<script lang="ts">
import { defineComponent } from 'vue'
import Map from '@/components/map/TheMap.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Map,
  },
})
</script>

<template>
  <main class="min-h-screen w-full">
    <Map />
  </main>
</template>
