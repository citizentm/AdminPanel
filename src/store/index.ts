import { createStore } from 'vuex'
import projects from './projects'
import reports from './reports'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    projects,
    reports,
  },
})
