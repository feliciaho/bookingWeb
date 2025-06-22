import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('roomsView', {
  state: () => ({
    roomData: [],
  }),
  actions: {
    // 取得房間資料
    async getRoomsData() {
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`
        const res = await axios.get(api)
        if (res.data.success == true) {
          console.log('getRoomsData:', res.data.products)
          // 房間資料
          this.roomData = res.data.products
        } else {
          console.error('Error getRooms:', res.data.message)
        }
      } catch (error) {
        console.error('Error getRooms function', error)
      }
    },
  }
})
