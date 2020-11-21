<script lang="ts">
import { defineComponent } from 'vue'
import { Card, Heading, PushButton } from '@/components/ui'
import { formatDistanceToNow } from 'date-fns'

export default defineComponent({
  components: { Card, Heading, PushButton },
  props: {
    report: { type: Object, required: true },
  },
  setup() {
    return {
      formatDistanceToNow,
    }
  },
})
</script>

<template>
  <div class="absolute left-0 top-0 w-full h-screen z-50 pointer-events-none">
    <div class="container">
      <Card
        class="absolute bottom-0 left-0 w-full md:w-96 pointer-events-auto md:m-4 overflow-hidden"
      >
        <div class="w-full flex flex-row flex-nowrap h-40 overflow-x-auto">
          <img
            v-for="img of report.images"
            :key="img.id"
            :src="img.url"
            alt="image"
            class="h-full object-cover"
            :class="{
              'w-9/12 mr-1': report.images.length > 1,
              'w-full': report.images.length === 1,
            }"
          />
        </div>
        <div class="p-4">
          <span class="font-bold"> 👍 {{ report.votes }} </span>
          <Heading h="3" class="my-4">
            Reported
            {{
              formatDistanceToNow(new Date(report.created_at), {
                addSuffix: true,
              })
            }}
          </Heading>
          <p class="mb-8">
            {{ report.description }}
          </p>
          <PushButton type="button" variant="primary" label="Mark as solved" />
        </div>
      </Card>
    </div>
  </div>
</template>
