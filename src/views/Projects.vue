<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Heading, Card } from '@/components/ui'

export default defineComponent({
  components: {
    Heading,
    Card,
  },
  setup() {
    const store = useStore()

    return {
      series: store.state.projects.series,
    }
  },
})
</script>

<template>
  <main class="container pt-20">
    <Heading h="1" class="mb-8">
      Projects
    </Heading>
    <div
      class="p-4 mb-4 bg-gray-200 rounded-lg"
      v-for="(serie, i) of series"
      :key="i"
    >
      <div class="mb-4">
        <Heading h="2">
          {{ serie.title }}
        </Heading>

        <div class="flex flex-row space-x-8 text-gray-600 mt-2">
          <p class="flex items-center">
            <i class="gg-euro mr-2" /> {{ serie.budget }}
          </p>
          <p class="flex items-center">
            <i class="gg-calendar-today mr-2" /> {{ serie.deadline }}
          </p>
        </div>
      </div>

      <Card
        v-for="(project, i) of serie.projects"
        :key="i"
        class="flex flex-row justify-between items-center p-3 mt-2"
      >
        <div class="flex flex-col">
          <strong>{{ project.title }}</strong>
          <span class="flex items-center text-gray-600">
            <i class="gg-euro"></i> {{ project.budget }}</span
          >
        </div>

        <span>{{ project.votes }} votes</span>
      </Card>
    </div>
  </main>
</template>

<style></style>
