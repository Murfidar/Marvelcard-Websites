import { defineStore } from 'pinia'
import axios from 'axios'
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://iproject-marvelcard.kfcapi.site'

export const useContentStore = defineStore('content', {
  state: () => {
    return {
      comics: {},
      characters: {},
      series: {}
    }
  },
  actions: {
    async getCharacters(search, limit, page) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/contents/characters`,
          params: { search, limit, page }
        })
        this.characters = data
      } catch (error) {
        console.log(error)
      }
    },

    async getComics(search, limit, page) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/contents/comics`,
          params: { search, limit, page }
        })
        this.comics = data
      } catch (error) {
        console.log(error)
      }
    },

    async getSeries(search, limit, page) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/contents/series`,
          params: { search, limit, page }
        })
        this.series = data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
