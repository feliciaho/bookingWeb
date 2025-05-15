import { defineStore } from 'pinia'
import filterStore from '@/stores/filterStore'

export default defineStore('paginationStore', {
  // data
  state: () => ({
    currentPage: 1,
  }),
  // computed
  getters: {
    //總頁數
    totalPage() {
      const filter = filterStore()
      return Math.ceil(filter.filterRecipes.length / 12)
    },
    // nowPageStore 是一個新的變數 儲存用過濾過後的array
    // 並且再依據數量分頁
    nowPageStore() {
      const filter = filterStore()
      // slice 寫法
      const start = (this.currentPage - 1) * 12
      const end = start + 12
      // return nowPageStore一個array 這個array是從filterData slice過後的array
      return filter.filterRecipes.slice(start, end)
      // 透過actions修改 filterStore中的filterRecipes
    },
  },
  // methods
  actions: {
    switchPage(page) {
      this.currentPage = page
      setTimeout(() => {
        const element = document.querySelector('#homeWrap') // 假設有一個 id 為 'top' 的元素
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth', // 平滑滾動
            block: 'start', // 滾動到元素的頂部
          })
        }
      }, 300)
    },
  },
})
