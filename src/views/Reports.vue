<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { Heading, Card } from '@/components/ui'
import { formatDistanceToNow } from 'date-fns'
import { Report } from '@/store/reports'
import { useHttp } from '@/hooks/useHttp'

export default defineComponent({
  components: {
    Heading,
    Card,
  },
  setup() {
    const state = reactive({
      reports: [] as Report[],
    })
    const [, fetchReports] = useHttp('get')

    const since = (date: Date) => {
      return formatDistanceToNow(new Date(date))
    }

    onMounted(async () => {
      try {
        const response = await fetchReports('problems?_sort=created_at:DESC')
        state.reports = await response.json()
      } catch (err) {
        console.log(err.reponse)
      }
    })

    return {
      since,
      state,
    }
  },
})
</script>

<template>
  <main class="container pt-20">
    <Heading h="1" class="mb-8">
      Reports
    </Heading>
    <div class="flex flex-col space-y-2">
      <router-link
        v-for="(report, i) of state.reports"
        :key="i"
        :to="{ path: '/', query: { q: report.id } }"
        :class="{ 'opacity-25': report.isResolved }"
      >
        <Card class="p-4 flex flex-col md:flex-row justify-between">
          <div class="flex flex-row items-center">
            <div class="flex items-center justify-center w-10 mr-2">
              <i
                v-if="report.isResolved"
                class="gg-check h-8 w-8 bg-green-600 text-white"
              />
              <i v-else class="gg-danger h-8 w-8 bg-yellow-500 text-gray-800" />
            </div>
            <div class="flex flex-col">
              <strong>
                {{ report.description }}
              </strong>
              <small> Reported {{ since(report.created_at) }} ago</small>
            </div>
          </div>
          <div class="flex items-center">
            <span class="font-bold">👍 {{ report.votes }}</span>
          </div>
        </Card>
      </router-link>
    </div>
  </main>
</template>

<style></style>
