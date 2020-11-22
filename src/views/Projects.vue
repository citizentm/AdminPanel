<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { Heading, Card } from '@/components/ui'
import { useHttp } from '@/hooks/useHttp'
import { formatDistanceToNow } from 'date-fns'

export default defineComponent({
  components: {
    Heading,
    Card,
  },
  setup() {
    const state = reactive({
      projects: [] as any,
    })
    const [, getProjects] = useHttp('get')

    async function fetchProjects() {
      try {
        const response = await getProjects('projects?_sort=deadline:desc')
        state.projects = await response.json()
      } catch (err) {
        console.log(err)
      }
    }

    onMounted(async () => {
      await fetchProjects()
    })

    return {
      state,
      formatDistanceToNow,
    }
  },
})
</script>

<template>
  <main class="container pt-20">
    <Heading h="1" class="mb-8">
      Projects
    </Heading>
    <router-link
      to="/projects/create"
      class="w-full flex items-center justify-center rounded-lg text-gray-800 bg-gray-200 mb-4 py-8"
    >
      New project proposal
    </router-link>
    <div class="p-4 mb-4 bg-gray-200 rounded-lg" v-for="(project, i) of state.projects" :key="i">
      <div class="mb-4">
        <Heading h="2">
          {{ project.title }}
        </Heading>

        <div class="flex flex-row space-x-8 text-gray-600 mt-2">
          <p class="flex items-center"><i class="gg-euro mr-2" /> {{ project.budget }}</p>
          <p class="flex items-center">
            <i class="gg-calendar-today mr-2" />
            Deadline in {{ formatDistanceToNow(new Date(project.deadline), { addPrefix: true }) }}
          </p>
        </div>
      </div>

      <Card
        v-for="(initiative, i) of project.initiatives"
        :key="i"
        class="flex flex-row justify-between items-center p-3 mt-2"
      >
        <div class="flex flex-col">
          <strong>{{ initiative.title }}</strong>
          <span class="flex items-center text-gray-600">
            <i class="gg-euro"></i> {{ initiative.budget }}</span
          >
        </div>

        <span>{{ initiative.votes }} votes</span>
      </Card>
    </div>
  </main>
</template>

<style></style>
