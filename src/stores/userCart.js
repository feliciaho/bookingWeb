import { defineStore } from 'pinia'
import axios from 'axios'
import loadingStore from '@/stores/loadingStore'
import toastStore from '@/stores/toastStore'

export default defineStore('userCart', {
  state: () => ({
  }),
  actions: {
    // 加入購物車
    async addCart(id) {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/cart`
        // 準備要加入購物車的資料
        const cart = {
          product_id: id,
          qty: 1,
        }
        const res = await axios.post(api, { data: cart })
        if (res.data.success == true) {
          console.log('Successful add room to cart')
          // 吐司訊息
          toast.toastSuccess('Add To Cart Success', '');
        } else {
          console.error('Error add room to cart', res.data.message)
          // 吐司訊息
          toast.toastFailed('Update Failed', res.data.message.join('、'));
        }
      } catch (error) {
        console.error('Error addCart function', error)
      }finally {
        // 停止loading
        loading.stopLoading();
      }
    },
  }
})
