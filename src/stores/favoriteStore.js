import { defineStore } from 'pinia'
import recipeStore from '@/stores/recipeStore'
export default defineStore('favoriteStore', {
  // data
  state: () => ({
    //將從localStorage的取得的資料(先取一個名叫favoriteRecipes)轉成陣列
    favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  }),
  // methods
  actions: {
    // 再將此陣列(favoriteRecipes)重新轉回字串存入localStorage
    storeLocalStorage() {
      localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipes))
    },
    addFavorite(recipeAddId) {
      const recipeInfo = recipeStore()
      // 檢查此食譜是否已經存在於收藏中
      // 注意不能用=== 要用 == 因為recipeAddId是字串
      // 而this.favoriteRecipes裡的id是數字
      const existingRecipe = this.favoriteRecipes.find((item) => item.id == recipeAddId)
      // 如果已存在則return
      if (existingRecipe) {
        return
      } else {
        // 如果不存在則從食譜列表中找到該食譜
        const recipe = recipeInfo.recipes.find((item) => item.id == recipeAddId)
        // 如果不存在則加入push食譜至favoriteRecipes
        this.favoriteRecipes.push(recipe)
        // 再將此陣列重新轉回字串存入localStorage
        this.storeLocalStorage()
      }
    },
    removeFavorite(recipeRemoveId) {
      // const recipeInfo = recipeStore();
      // 檢查此食譜是否已經存在於收藏中
      const existingRecipe = this.favoriteRecipes.find((item) => item.id == recipeRemoveId)
      // 如果不存在則return
      if (!existingRecipe) {
        return
        // 如果存在則從收藏中刪除
      } else {
        const index = this.favoriteRecipes.findIndex((item) => item.id == recipeRemoveId)
        // 將此物件從陣列中刪除
        this.favoriteRecipes.splice(index, 1)
        // 再將此陣列重新轉回字串存入localStorage
        this.storeLocalStorage()
      }
    },
  },
})
