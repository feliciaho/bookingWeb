import { defineStore } from 'pinia'
import axios from 'axios'
import loadingStore from '@/stores/loadingStore'
import toastStore from './toastStore'

export default defineStore('bookingStore', {
  state: () => ({
    BookingData: [],
    checkIn: null,
    checkOut: null,
  }),
  actions: {
    // 加入訂單
    async addBooking(id, nights) {
      try {
        await this.getBooking();
        // 如果訂單內有東西，先清空訂單再加入新資料
        if (this.BookingData.length > 0) {
          await this.removeBooking();
        }
        // 開始呼叫API加入訂單
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        const data = {
          product_id: id,
          qty: nights,
        }
        const res = await axios.post(api, { data: data })
        if (res.data.success == true) {
          console.log('Successful add room to booking')
          // 加入成功後同步取得訂單資料
          await this.getBooking();
        } else {
          console.error('Error add room to booking', res.data.message)
        }
      } catch (error) {
        console.error('Error addBooking function', error)
      }
    },
    // 更新訂單資料(更新房間日期)
    async updateBooking(id, nights) {
      const toast = toastStore()
      const loading = loadingStore()
      loading.startLoading();
      // 檢查nights是否為有效數字，如不是則return
      if (nights <= 0 || nights === null) {
        console.error('Nights must be greater than 0')
        loading.stopLoading();
        return;
      }
      try {
        // 開始呼叫API加入訂單
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${id}`
        const data = {
          product_id: id,
          qty: nights,
        }
        const res = await axios.put(api, { data: data })
        if (res.data.success == true) {
          console.log('Successful update room to booking')
          // 吐司訊息
          toast.toastSuccess('Update Successful')
          // 加入成功後同步取得訂單資料
          await this.getBooking();
        } else {
          console.error('Error update room to booking', res.data.message)
          // 吐司訊息
          toast.toastError('Update Failed', res.data.message)
        }
      } catch (error) {
        console.error('Error updateRoom function', error)
      }
    },
    // 取得訂單資料
    async getBooking() {
      const loading = loadingStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        const res = await axios.get(api)
        if (res.data.success == true) {
          console.log('Successful get booking data')
          this.BookingData = res.data.data.carts
        } else {
          console.error('Error get booking data', res.data.message)
        }
      } catch (error) {
        console.error('Error getBooking function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    // 刪除訂單資料
    async removeBooking() {
      const loading = loadingStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/carts`
        const res = await axios.delete(api)
        if (res.data.success == true) {
          console.log('Successful remove')
        } else {
          console.error('Error remove', res.data.message)
        }
      } catch (error) {
        console.error('Error remove function', error)
      }
    },
  }
})
