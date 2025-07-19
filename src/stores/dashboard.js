import { defineStore } from 'pinia'
import axios from 'axios'
import loadingStore from '@/stores/loadingStore'
import modalToggle from '@/stores/modalToggle'
import toastStore from '@/stores/toastStore'

export default defineStore('dashboard', {
  state: () => ({
    rooms: [],
    orders: [],
    orderDetailsData: {},
    tempRoom: {
      // 一定要加，因為一開始沒有這個值，直接加上四個空值這樣才可以填寫input
      imagesUrl: ['','','',''],
    },
    newRoom: false,
    rooms_pagination: {},
    orders_pagination: {},
    tabToggle: "room",
  }),
  actions: {
    // 取得房間資料,預設帶入參數page = 1
    async getRooms(page = 1) {
      const loading = loadingStore()
      // 先開始loading
      loading.startLoading();
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`
        const res = await axios.get(api)
        if (res.data.success == true) {
          // 取得房間資料
          console.log('Successful get rooms')
          this.rooms = res.data.products
          // 取得pagination資料
          this.rooms_pagination = res.data.pagination
        } else {
          console.error('Error get rooms', res.data.message)
        }
      } catch (error) {
        console.error('Error get rooms function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    //更新房間資料
    async updateRoom() {
      const loading = loadingStore()
      const modal = modalToggle()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`
        let httpMethod = 'post'
        // 如果是編輯的話則把api跟呼叫方式更改
        if (this.newRoom === false) {
          api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${this.tempRoom.id}`
          httpMethod = 'put'
        }
        //要使用中括號js動態屬性存取語法
        const res = await axios[httpMethod](api, { data: this.tempRoom })
        if (res.data.success == true) {
          console.log('Successful update room')
          // 重新取得房間資料
          this.getRooms()
          // 吐司訊息
          toast.toastSuccess('Update Success', '');
        } else {
          console.log('Error update room')
          // 吐司訊息
          toast.toastFailed('Update Failed', res.data.message.join('、'));
        }
      } catch (error) {
        console.log('Error update function', error)
      } finally {
        // 停止loading
        // 關閉modal
        modal.closeModal();
        loading.stopLoading();
      }
    },
    //刪除房間資料
    async deleteRoom(room) {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${room.id}`
        const res = await axios.delete(api)
        if (res.data.success == true) {
          console.log('Successful delete room')
          // 重新取得房間資料
          this.getRooms()
          // 吐司訊息
          toast.toastSuccess('Delete Success', '');
        } else {
          console.log('Error delete room')
          // 吐司訊息
          toast.toastFailed('Delete Failed');
        }
      } catch (error) {
        console.log('Error delete function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    //上傳圖片
    async uploadFile() {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        const uploadedFile = document.querySelector('#imageFile').files[0]
        // console.dir(uploadedFile)
        // 先建立一個變數formData 來儲存
        const formData = new FormData()
        // append新增欄位(name, 檔案)
        formData.append('file-to-upload', uploadedFile)
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload/`
        const res = await axios.post(api, formData)
        if (res.data.success == true) {
          console.log('Successful upload img')
          // 將圖片連結更換成新上傳的圖片
          this.tempRoom.imageUrl = res.data.imageUrl
          // 吐司訊息
          toast.toastSuccess('Update Success', '');
        } else {
          console.log('Error upload img')
          // 吐司訊息
          toast.toastFailed('Update Failed', res.data.message);
        }
      } catch (error) {
        console.log('Error upload img function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    // 取得訂單資料
    async getOrders(page = 1) {
      const loading = loadingStore()
      // 先開始loading
      loading.startLoading();
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/orders/?page=${page}`
        const res = await axios.get(api)
        if (res.data.success == true) {
          // 取得訂單資料
          console.log('Successful get orders')
          this.orders = res.data.orders
          // 取得pagination資料
          this.orders_pagination = res.data.pagination
        } else {
          console.error('Error get orders', res.data.message)
        }
      } catch (error) {
        console.error('Error get orders function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
    // 查看訂單更多資訊
    async orderDetails(order) {
      const modal = modalToggle()
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${order.id}`
        const res = await axios.get(api)
        if (res.data.success == true) {
          console.log('Successful get orders Details')
          // 取得訂單資料
          this.orderDetailsData = res.data.order
        } else {
          console.error('Error get orders Details', res.data.message)
        }
      } catch (error) {
        console.error('Error get orders Details function', error)
      } finally {
        // 彈跳視窗
        modal.showModal();
      }
    },
    // 刪除訂單
    async deleteOrder(order) {
      const loading = loadingStore()
      const toast = toastStore()
      // 先開始loading
      loading.startLoading();
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/order/${order.id}`
        const res = await axios.delete(api)
        if (res.data.success == true) {
          // 重新取得訂單資料
          this.getOrders()
          // 吐司訊息
          toast.toastSuccess('Delete Success', '');
        } else {
          // 吐司訊息
          toast.toastFailed('Delete Failed');
        }
      } catch (error) {
        console.log('Error delete function', error)
      } finally {
        // 停止loading
        loading.stopLoading();
      }
    },
  },
})
