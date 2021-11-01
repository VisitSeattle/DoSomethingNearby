import Vue from 'vue'
import FilterService from '../services/FilterService'
// Mutation Names
const setCheckedFilters = 'SET_CHECKED_FILTERS'
const setRemovedFilter = 'SET_REMOVED_FILTER'
const setFilter = 'SET_FILTER'

const defaultState = {
  removedFilter: null,
  checkedFilters: {
    neighborhoods: [],
    categories: [],
    regions: []
  },
  filter: {
    categories: [],
    regions: [],
    neighborhoods: []
  }
}

export const state = () => ({ ...defaultState })

export const getters = {
  removedFilter: state => state.removedFilter,
  checkedFilters: state => state.checkedFilters,
  filter: state => state.filter
}

export const actions = {
  setCheckedFilters (context, checkedFilters) {
    context.commit(setCheckedFilters, checkedFilters)
  },
  setRemovedFilter (context, removedTag) {
    const tagObject = FilterService.getFilterObjectByTag(removedTag)
    context.commit(setRemovedFilter, tagObject)
  },
  setFilter (context, filter) {
    context.commit(setFilter, filter)
  },
  removeFilters (context) {
    context.commit(setRemovedFilter, FilterService.getAllFilterRemoveObject())
  }
}

export const mutations = {
  [setCheckedFilters] (state, checkedFilters) {
    Vue.set(state, 'checkedFilters', checkedFilters)
  },
  [setRemovedFilter] (state, removedFilter) {
    Vue.set(state, 'removedFilter', removedFilter)
  },
  [setFilter] (state, filter) {
    Vue.set(state, 'filter', filter)
  }
}
