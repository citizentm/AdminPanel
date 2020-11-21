<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { map, tileLayer } from 'leaflet'

const token =
  'pk.eyJ1IjoiYXJwYWRnYWJvciIsImEiOiJja2hxenFzM2QweWZpMzBwNTBqdDRxMDI4In0.svvpn71wbZmLj_n92s4_UA'
export default defineComponent({
  setup() {
    onMounted(() => {
      const view = map('map', {
        zoomControl: false,
      }).setView([45.75, 21.22], 15)
      tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: token,
        },
      ).addTo(view)
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
