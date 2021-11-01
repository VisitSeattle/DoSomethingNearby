import Vue from 'vue'
// Mutation Names
const setSelectedSort = 'SET_SELECTED_SORT'
const setUserPosition = 'SET_USER_POSITION'
const setGeolocationError = 'SET_GEOLOCATION_ERROR'

const defaultState = {
  selectedSort: 'alphabetical',
  userPosition: null,
  geolocationError: ''
}

export const state = () => ({ ...defaultState })

export const getters = {
  selectedSort: state => state.selectedSort,
  userPosition: state => state.userPosition,
  geolocationError: state => state.geolocationError
}

export const actions = {
  setSelectedSort (context, selectedSort) {
    context.commit(setSelectedSort, selectedSort)
  },
  setUserPosition (context, userPosition) {
    context.commit(setUserPosition, userPosition)
  },
  setGeolocationError (context, geolocationError) {
    context.commit(setGeolocationError, geolocationError)
  }
}

export const mutations = {
  [setSelectedSort] (state, selectedSort) {
    Vue.set(state, 'selectedSort', selectedSort)
  },
  [setUserPosition] (state, userPosition) {
    Vue.set(state, 'userPosition', userPosition)
  },
  [setGeolocationError] (state, geolocationError) {
    Vue.set(state, 'geolocationError', geolocationError)
  }
}
