<script lang="ts">
import { defineComponent, markRaw } from 'vue'

const links = markRaw([
  {
    label: 'Map',
    path: '/',
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" /></svg>`,
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C15.9 2 19 5.1 19 9C19 14.2 12 22 12 22S5 14.2 5 9C5 5.1 8.1 2 12 2M11 6V12H13V6H11M11 14V16H13V14H11Z" /></svg>`,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" /></svg>`,
  },
])

export default defineComponent({
  setup() {
    return {
      links,
    }
  },
})
</script>

<template>
  <nav class="w-full fixed left-0 bottom-0 bg-white shadow-lg h-16">
    <div class="flex flex-row justify-center items-center h-full">
      <router-link
        v-for="link of links"
        :key="link.path"
        :to="link.path"
        class="flex flex-1 flex-col items-center justify-center text-center text-sm"
        active-class="text-green-500"
      >
        <div v-html="link.icon" class=""></div>
        <span>{{ link.label }}</span>
      </router-link>
    </div>
  </nav>
</template>
