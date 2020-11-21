<script lang="ts">
import LayoutDefault from './router/layouts/LayoutDefault.vue'
import LayoutPlain from './router/layouts/LayoutPlain.vue'

import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

export default {
  components: {
    default: LayoutDefault,
    plain: LayoutPlain,
  },
  setup() {
    const route = useRoute()
    const layout = ref(null)

    watchEffect(() => {
      layout.value = route.meta.layout
    })

    return {
      layout,
    }
  },
}
</script>

<template>
  <component :is="layout ?? 'default'">
    <router-view />
  </component>
</template>
