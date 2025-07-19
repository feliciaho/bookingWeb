import { defineStore } from 'pinia'
import axios from 'axios'
import loadingStore from '@/stores/loadingStore'
import toastStore from './toastStore'

export default defineStore('bookingStore', {
  state: () => ({
    BookingData: [],
    checkIn: null,
    checkOut: null,
    guests: 1,
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
          // 加入成功後同步取得訂單資料
          await this.getBooking();
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
          // 吐司訊息
          toast.toastSuccess('Update Successful')
          // 加入成功後同步取得訂單資料
          await this.getBooking();
        } else {
          // 吐司訊息
          toast.toastError('Update Failed', res.data.message)
        }
      } catch (error) {
        console.error('Error updateRoom function', error)
      }finally{
        loading.stopLoading();
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
          this.BookingData = res.data.data.carts
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
        await axios.delete(api)
      } catch (error) {
        console.error('Error remove function', error)
      }
    },
  }
})
