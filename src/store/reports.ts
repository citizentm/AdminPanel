import { reports } from '@/mocks.json'

export default {
  state: () => ({
    list: (reports as unknown) as Report[],
  }),
}

export interface Report {
  lat: string
  long: string
  votes: number
  description: string
  images: Record<'url', string>[]
  reportedAt: Date
  isResolved: boolean
  resolvedAt?: Date
  comment?: string
}
