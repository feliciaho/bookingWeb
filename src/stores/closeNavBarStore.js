import { defineStore } from 'pinia'
import { Collapse } from 'bootstrap'
import filterStore from '@/stores/filterStore'

// 由於search 跟 navBar 都要用到這個methods所以寫在pinia

export default defineStore('closeNavBarStore', {
  // data
  state: () => ({}),
  // methods
  actions: {
    //關閉navBar
    closeNavbar(trigger) {
      const filter = filterStore()
      //由於router 會導致navbar-collapse無法正常關閉
      //所以這裡使用bootstrap 5.0 的 collapse API 來手動關閉
      const navbarCollapse = document.querySelector('#navbarNavDropdown')
      if (navbarCollapse) {
        const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse)
        bsCollapse.hide() // 使用 Bootstrap 的 API 隱藏
      }
      if (trigger) {
        // 如果傳入trigger為true 代表是從navBar來的
        filter.searchData = '' // 清空搜尋資料
      }else{
        setTimeout(() => {
          const element = document.querySelector('#homeWrap') // 假設有一個 id 為 'top' 的元素
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth', // 平滑滾動
              block: 'start', // 滾動到元素的頂部
            })
          }
        }, 300)
      }
    },
  },
})
