import { series } from '@/mocks.json'

export default {
  state: () => ({
    series: (series as unknown) as Series[],
  }),
}

interface Series {
  title: string
  budget: number
  deadline: Date
  projects: Project[]
}

interface Project {
  title: string
  description: string
  budget: number
  votes: number
}
