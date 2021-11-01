import Vue from 'vue'
import FavoritesService from '../services/FavoritesService'

// Mutation Names
const setFavorites = 'SET_FAVORITES'

const defaultState = {
  favorites: {}
}

export const state = () => ({ ...defaultState })

export const getters = {
  favorites: state => state.favorites
}

export const actions = {
  setFavorites (context, favorites) {
    FavoritesService.saveFavoritesInCookies(favorites)
    context.commit(setFavorites, favorites)
  },
  loadFavoritesCookies (context) {
    const favoritesHash = FavoritesService.getFavoritesFromCookies()
    context.commit(setFavorites, favoritesHash)
  }
}

export const mutations = {
  [setFavorites] (state, favorites) {
    Vue.set(state, 'favorites', favorites)
  }
}
