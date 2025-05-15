import { defineStore } from 'pinia';
import recipeStore from '@/stores/recipeStore';
import paginationStore from '@/stores/paginationStore';
// import { Collapse } from 'bootstrap';


export default defineStore('filterStore', {
  // data
  state: () => ({
    filterRecipes: [],
    searchData: '',
  }),
  // methods
  actions: {
    filterData() {
      const recipe = recipeStore() // 取用實例，只拿一次
      const pagination = paginationStore() // 取用實例，只拿一次
      // 如果searchData有值 則開始搜索過濾
      if (this.searchData) {
        // filter 搭配 includes 會回傳true 或 false
        // toLowerCase 是代表無論大小寫都匹配
        this.filterRecipes = recipe.recipes.filter((item) =>
          item.name.toLowerCase().includes(this.searchData.toLowerCase()),
        )
        pagination.currentPage = 1 // 搜尋後回到第一頁
      } else {
        // 如果 searchData是空值則直接回傳一樣的產品列表
        this.filterRecipes = recipe.recipes
        pagination.currentPage = 1 // 搜尋後回到第一頁
      }
      window.scrollTo({
        top: 0, // 滾動到頁面最頂
        behavior: 'smooth', // 平滑滾動
      })
    },
  },
})
