<script lang="ts">
import { defineComponent } from 'vue'
import { Heading, Card } from '@/components/ui'
import { useStore } from 'vuex'
import { formatDistanceToNow } from 'date-fns'

export default defineComponent({
  components: {
    Heading,
    Card,
  },
  setup() {
    const store = useStore()

    const since = (date: Date) => {
      return formatDistanceToNow(new Date(date))
    }

    return {
      reports: store.state.reports.list,
      since,
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
      <Card
        v-for="(report, i) of reports"
        :key="i"
        class="p-4 flex flex-col md:flex-row justify-between"
      >
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
            <small> Reported {{ since(report.reportedAt) }} ago</small>
          </div>
        </div>
        <div class="flex items-center">
          <span class="font-bold">👍 {{ report.votes }}</span>
        </div>
      </Card>
    </div>
  </main>
</template>

<style></style>
