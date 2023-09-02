import { defineStore } from 'pinia'
import axios from 'axios'
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://iproject-marvelcard.kfcapi.site'

export const useFavoriteStore = defineStore('favorites', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      favorites: [],
      favoritesId: []
    }
  },
  actions: {
    async getFavoriteCard() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/favorites/cards`,
          headers: { access_token: localStorage.access_token }
        })
        this.favorites = data
        this.favoritesId = data.favorites.map((el) => el.UserId)
      } catch (error) {
        console.log(error)
      }
    },

    async addToFavorite(cardDetail) {
      try {
        console.log(cardDetail);
        let { name, imgUrl, Urls } = cardDetail
        await axios({
          method: 'post',
          url: `${baseUrl}/favorites/character`,
          headers: { access_token: localStorage.access_token },
          data: { name, imgUrl, Urls }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteFavorite(id) {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${baseUrl}/favorites/cards/` + id,
          headers: { access_token: localStorage.access_token }
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
