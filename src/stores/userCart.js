import { defineStore } from 'pinia'
import axios from 'axios'
import loadingStore from '@/stores/loadingStore'
import toastStore from '@/stores/toastStore'

export default defineStore('userCart', {
  state: () => ({
    cartData: [],
    checkIn: new Date().toISOString().split('T')[0], // 綁定今日日期 (YYYY-MM-DD)
    checkOut: null,
    // newCheckOut: null,
  }),
  actions: {
    // 加入購物車
    async addCart(id,nights) {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        // 準備要加入購物車的資料
        const cart = {
          product_id: id,
          qty: nights,
        }
        const res = await axios.post(api, { data: cart })
        if (res.data.success == true) {
          console.log('Successful add room to cart')
          // 吐司訊息
          toast.toastSuccess('Add To Cart Success', '');
        } else {
          console.error('Error add room to cart', res.data.message)
          // 吐司訊息
          toast.toastFailed('Add To Cart Failed', res.data.message.join('、'));
        }
      } catch (error) {
        console.error('Error addCart function', error)
      }finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    // 取得購物車資料
    async getCart() {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        const res = await axios.get(api)
        if (res.data.success == true) {
          console.log('Successful get cart data')
          console.log(res.data.data.carts)
          this.cartData = res.data.data.carts
        } else {
          console.error('Error get cart data', res.data.message)
          // 吐司訊息
          toast.toastFailed('Get Cart Failed', res.data.message.join('、'));
        }
      } catch (error) {
        console.error('Error getCart function', error)
      }finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    // 刪除購物車資料
    async removeCart(id) {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${id}`
        const res = await axios.delete(api)
        if (res.data.success == true) {
          console.log('Successful remove')
          // 吐司訊息
          toast.toastSuccess('Remove Success', '');
          // 重新取得購物車資料
          this.getCart();
        } else {
          console.error('Error remove', res.data.message)
          // 吐司訊息
          toast.toastFailed('Remove Failed', res.data.message.join('、'));
        }
      } catch (error) {
        console.error('Error remove function', error)
      }finally {
        // 停止loading
        loading.stopLoading();
      }
    },
  }
})
