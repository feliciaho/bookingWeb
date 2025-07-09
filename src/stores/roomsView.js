import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('roomsView', {
  state: () => ({
    roomData: [],
    categoryData: null,
  }),
  actions: {
    // 取得房間資料
    async getRoomsData() {
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/products`
        // 如果有選擇分類則帶入參數
        if (this.categoryData) {
          api += `?category=${this.categoryData}`
        }
        const res = await axios.get(api)
        if (res.data.success == true) {
          console.log('Successful get roomsData')
          // 房間資料
          this.roomData = res.data.products
          // 從價錢最少開始排列
          this.roomData.sort((a, b) => a.price - b.price)
        } else {
          console.error('Error get roomsData', res.data.message)
        }
      } catch (error) {
        console.error('Error get roomsData function', error)
      }
    },
  }
})
