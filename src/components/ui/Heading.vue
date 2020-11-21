<script lang="ts">
import { defineComponent, ref } from 'vue'

const styles: Record<string, string> = {
  h1: `font-bold text-4xl text-gray-900 tracking-tight leading-tight`,
  h2: `font-bold text-3xl text-gray-900 tracking-tight leading-tight`,
  h3: `font-bold text-2xl text-gray-900 tracking-tight leading-tight`,
  h4: `font-bold text-xl text-gray-800 tracking-tight leading-tight`,
  h5: `text-lg text-gray-800 tracking-tight leading-tight`,
  h6: `text-base text-gray-700 tracking-tight leading-tight`,
}

export default defineComponent({
  name: 'Heading',
  props: {
    h: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const elem = ref<string>(`h${props.h}`)
    const classList = ref<string>(styles[elem.value])

    return {
      classList,
      elem,
    }
  },
})
</script>

<template>
  <component :is="elem" :class="classList">
    <slot />
  </component>
</template>
