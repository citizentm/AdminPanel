<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavigationMobile from './NavigationMobile.vue'

const links = ref([
  { label: 'Hartă', path: '/' },
  { label: 'Raportări', path: '/reports' },
  { label: 'Proiecte Publice', path: '/projects' },
])

export default defineComponent({
  components: {
    NavigationMobile,
  },
  setup() {
    return {
      links,
    }
  },
})
</script>

<template>
  <div
    class="w-full bg-white bg-opacity-10 h-16 absolute top-0 right-0 z-50"
    style="backdrop-filter: blur(25px);"
  >
    <div class="container h-full flex md:justify-between items-center">
      <div id="brand">
        <span class="font-bold text-green-500 text-xl tracking-tighter"
          >CitizenTM</span
        >
      </div>
      <nav class="hidden md:flex flex-row items-center space-x-8 font-bold">
        <div v-for="link of links" :key="link.path">
          <router-link
            :to="link.path"
            active-class="underline text-green-500"
            >{{ link.label }}</router-link
          >
        </div>
      </nav>
    </div>
  </div>
  <NavigationMobile class="md:hidden z-50" />
</template>

<style lang="postcss" scoped></style>
