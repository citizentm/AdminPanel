<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Map from '@/components/map/TheMap.vue'
import ProblemDetailsPopup from '@/components/problems/ProblemDetailsPopup.vue'

import { Report } from '@/store/reports'
import { addMarker } from '@/hooks/useMap'
import { useHttp } from '@/hooks/useHttp'

// import { LeafletEvent } from 'leaflet'

export default defineComponent({
  name: 'Home',
  components: {
    Map,
    ProblemDetailsPopup,
  },
  setup() {
    const [, doGet] = useHttp('get')

    const reports = ref<Report[]>([])
    const selectedReport = ref<Report>()

    function addMarkers() {
      reports.value.forEach((report) => {
        addMarker({
          lat: report.latitude,
          long: report.longitude,
          title: report.description,
          callback: () => {
            selectedReport.value = reports.value.find(
              ({ id }) => id === report.id,
            )
          },
        })
      })
    }

    onMounted(async () => {
      try {
        const response = await doGet('problems')
        reports.value = await response.json()
        addMarkers()
      } catch (err) {
        console.log(err)
      }
    })

    return {
      selectedReport,
    }
  },
})
</script>

<template>
  <main class="min-h-screen w-full">
    <Map />
    <ProblemDetailsPopup v-if="selectedReport" :report="selectedReport" />
  </main>
</template>

<style lang="postcss">
.x-popup {
  @apply rounded-full;

  .leaflet-popup-content {
    margin: 0;
    overflow: hidden;
    width: 10rem;
    @apply rounded-t-lg;
  }

  .leaflet-popup-content-wrapper {
    @apply rounded-lg p-0 shadow-lg;
  }

  .leaflet-popup-close-button {
    @apply hidden;
  }
}
</style>
