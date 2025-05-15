import axios from 'axios'
import { defineStore } from 'pinia'

export default defineStore('recipeStore', {
  state: () => ({
    recipes: [],
  }),
  actions: {
    async fetchApi() {
      try {
        const url = `${import.meta.env.VITE_APP_API}`
        const response = await axios.get(url)
        console.log('success')
        this.recipes = response.data.recipes
      } catch (error) {
        console.error('error', error)
      }
    },
  },
})
