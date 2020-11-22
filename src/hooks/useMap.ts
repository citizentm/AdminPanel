import L, { LeafletEvent } from 'leaflet'
import { ref } from 'vue'

const map = ref<L.Map>()

export const redIcon = L.icon({
  iconUrl: '/marker-red.png',
  iconSize: [32, 41],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
})

const token =
  'pk.eyJ1IjoiYXJwYWRnYWJvciIsImEiOiJja2hxenFzM2QweWZpMzBwNTBqdDRxMDI4In0.svvpn71wbZmLj_n92s4_UA'

export function setupMap(elem: string): void {
  map.value = L.map(elem, {
    zoomControl: false,
  }).setView([45.75, 21.22], 15)

  L.tileLayer(
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
  ).addTo(map.value)
}

export function addMarker(args: AddMarkerArgs) {
  if (!map.value) return

  return L.marker([args.lat, args.long], {
    title: args.title,
    autoPan: true,
    icon: redIcon,
  })
    .addTo(map.value)
    .addEventListener('click', args.callback)
}

export function zoomTo(lat: number, long: number) {
  if (!map.value) return

  map.value.setView([lat, long], 15, {
    duration: 5000,
    easeLinearity: 10,
  })
}

interface AddMarkerArgs {
  lat: number
  long: number
  title: string
  callback: (event: LeafletEvent) => void
}
