<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Map from '@/components/map/TheMap.vue'
import ProblemDetailsPopup from '@/components/problems/ProblemDetailsPopup.vue'

import { Report } from '@/store/reports'
import { addMarker, zoomTo } from '@/hooks/useMap'
import { useHttp } from '@/hooks/useHttp'
import { Marker } from 'leaflet'
import { useRoute, useRouter } from 'vue-router'

// import { LeafletEvent } from 'leaflet'
interface MarkerList {
  reportId?: number
  marker?: Marker
}

export default defineComponent({
  name: 'Home',
  components: {
    Map,
    ProblemDetailsPopup,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const [, doGet] = useHttp('get')

    const markers = ref<MarkerList[]>([])
    const reports = ref<Report[]>([])
    const selectedReport = ref<Report>()

    function addMarkers() {
      reports.value.forEach((report) => {
        markers.value.push({
          reportId: report.id,
          marker: addMarker({
            lat: report.latitude,
            long: report.longitude,
            title: report.description,
            callback: () => {
              router.push({ query: { q: report.id } })
              selectedReport.value = reports.value.find(
                ({ id }) => id === report.id,
              )
              if (selectedReport.value) {
                zoomTo(
                  selectedReport.value?.latitude,
                  selectedReport.value?.longitude,
                )
              }
            },
          }),
        })
      })
    }

    async function fetchProblems() {
      try {
        const response = await doGet('problems?isResolved=false')
        reports.value = await response.json()
        addMarkers()
      } catch (err) {
        console.log(err)
      }
    }

    function closePopup() {
      selectedReport.value = undefined
      router.push({ query: undefined })
    }
    async function removeMarker(id: number) {
      const marker = markers.value.find(({ reportId }) => reportId === id)
      marker?.marker?.remove()
      closePopup()
      await fetchProblems()
    }

    onMounted(async () => {
      await fetchProblems()

      if (route.query.q) {
        selectedReport.value = reports.value.find(
          ({ id }) => `${id}` === `${route.query.q}`,
        )
        if (selectedReport.value) {
          zoomTo(
            selectedReport.value?.latitude,
            selectedReport.value?.longitude,
          )
        }
      }
    })

    return {
      selectedReport,
      removeMarker,
      closePopup,
    }
  },
})
</script>

<template>
  <main class="min-h-screen w-full">
    <Map />
    <ProblemDetailsPopup
      v-if="selectedReport"
      :report="selectedReport"
      @solved="removeMarker"
      @close="closePopup"
    />
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
