import PlacesService from '../services/PlacesService'
import ReportService from '../services/ReportService'
import Vue from 'vue'
// Mutation Names
const setReport = 'SET_REPORT'
const setError = 'SET_ERROR'
const setBusinesses = 'SET_BUSINESSES'

const defaultState = {
  report: null,
  error: null,
  businesses: []
}

export const state = () => ({ ...defaultState })

export const getters = {
  report: state => state.report,
  error: state => state.error,
  businesses: state => state.businesses
}

export const actions = {
  async getReport (context, serviceConfig) {
    return ReportService.getReport(serviceConfig)
      .then(({ report, error }) => {
        if (error) {
          context.commit(setError, error)
          context.commit(setReport, null)
        }
        if (report) {
          context.commit(setReport, report)
          context.commit(setError, null)
        }
      })
  },
  setError (context, error) {
    context.commit(setError, error)
  },
  setBusinesses (context, error) {
    context.commit(setBusinesses, error)
  },
  async getBusinesses (context, serviceConfig) {
    if (!context.state.businesses.length) {
      return PlacesService.getBusinesses(serviceConfig)
        .then(businesses => {
          context.commit(setBusinesses, businesses)
        })
    } else {
      return context.state.businesses
    }
  }
}

export const mutations = {
  [setReport] (state, report) {
    Vue.set(state, 'report', report)
  },
  [setError] (state, error) {
    Vue.set(state, 'error', error)
  },
  [setBusinesses] (state, businesses) {
    Vue.set(state, 'businesses', businesses)
  }
}
