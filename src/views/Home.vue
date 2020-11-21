<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Map from '@/components/map/TheMap.vue'
import { Report } from '@/store/reports'
import { useStore } from 'vuex'
import { useMap, redIcon } from '@/hooks/useMap'

export default defineComponent({
  name: 'Home',
  components: {
    Map,
  },
  setup() {
    const store = useStore()
    const { map, marker } = useMap()

    const reports: Report[] = store.state.reports.list

    onMounted(() => {
      reports.forEach((report) => {
        marker([+report.lat, +report.long], {
          title: report.description,
          riseOnHover: true,
          autoPan: true,
          icon: redIcon,
        })
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          .addTo(map.value)
          .bindPopup(
            `<img src="${report.images[0].url}" /><div class="p-3">${report.description} <br/>👍 ${report.votes}</div>`,
            {
              className: 'x-popup',
            },
          )
      })
    })
  },
})
</script>

<template>
  <main class="min-h-screen w-full">
    <Map />
  </main>
</template>

<style lang="postcss">
.x-popup {
  .leaflet-popup-content {
    margin: 0;
    overflow: hidden;
    @apply rounded-t-lg;
  }
}
</style>
