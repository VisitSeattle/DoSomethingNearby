
import Vue from 'vue'
const FavoritesService = {
  getFavoritesFromCookies () {
    const favoritesCookie = Vue.$cookies.get('favorites')
    const favoritesHash = {}
    if (favoritesCookie) {
      const favoritesArray = favoritesCookie.split('|')
      favoritesArray.forEach(id => {
        favoritesHash[id] = true
      })
    }
    return favoritesHash
  },
  saveFavoritesInCookies (favorites) {
    const favoritesCookie = Object.keys(favorites).join('|')
    Vue.$cookies.set('favorites', favoritesCookie, '1y')
  }
}

export default FavoritesService
