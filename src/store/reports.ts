import { reports } from '@/mocks.json'

export default {
  state: () => ({
    list: (reports as unknown) as Report[],
  }),
}

export interface Report {
  id: number
  latitude: number
  longitude: number
  votes: number
  description: string
  images: {
    id: number
    url: string
  }[]
  isResolved: boolean
  resolvedAt?: Date
  comment?: string
  created_at: Date
  updated_at: Date
}
