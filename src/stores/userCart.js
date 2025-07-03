import { defineStore } from 'pinia'
import axios from 'axios'
import loadingStore from '@/stores/loadingStore'
import toastStore from './toastStore'

export default defineStore('userCart', {
  state: () => ({
    cartData: [],
    checkIn: null,
    checkOut: null,
  }),
  actions: {
    // 加入購物車
    async addCart(id, nights) {
      try {
        // 如果購物車內有東西，先清空購物車再加入新資料
        if (this.cartData.length > 0) {
          await this.removeCart();
        }
        // 開始呼叫API加入購物車
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        const cart = {
          product_id: id,
          qty: nights,
        }
        const res = await axios.post(api, { data: cart })
        if (res.data.success == true) {
          console.log('Successful add room to cart')
          // 加入成功後同步取得購物車資料
          await this.getCart();
        } else {
          console.error('Error add room to cart', res.data.message)
        }
      } catch (error) {
        console.error('Error addCart function', error)
      }
    },
    // 更新購物車資料(更新房間日期)
    async updateCart(id, nights) {
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
        // 開始呼叫API加入購物車
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${id}`
        const cart = {
          product_id: id,
          qty: nights,
        }
        const res = await axios.put(api, { data: cart })
        if (res.data.success == true) {
          console.log('Successful update room to cart')
          // 吐司訊息
          toast.toastSuccess('Update Successful')
          // 加入成功後同步取得購物車資料
          await this.getCart();
        } else {
          console.error('Error update room to cart', res.data.message)
          // 吐司訊息
          toast.toastError('Update Failed', res.data.message)
        }
      } catch (error) {
        console.error('Error updateRoom function', error)
      }
    },
    // 取得購物車資料
    async getCart() {
      const loading = loadingStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        const res = await axios.get(api)
        if (res.data.success == true) {
          console.log('Successful get cart data')
          this.cartData = res.data.data.carts
        } else {
          console.error('Error get cart data', res.data.message)
        }
      } catch (error) {
        console.error('Error getCart function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    // 刪除購物車資料
    async removeCart() {
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
