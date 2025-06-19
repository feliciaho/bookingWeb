import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('dashboard', {
  state: () => ({
    rooms: [],
    roomData: {},
    tempRoomData: {},
    newRoom: false,
    toastTitle: 'Update',
    toastContent: '15165',
    toastSuccess: false,
    toastToogleSet: false,
  }),
  actions: {
    // 吐司訊息
    toastShow() {
      this.toastToogleSet = true
      setTimeout(() => {
        this.toastToogleSet = false
      }, 3000)
    },
    // 取得房間資料
    async getRooms() {
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products`
        const res = await axios.get(api)
        if (res.data.success == true) {
          this.rooms = res.data.products
        } else {
          console.error('Error getRooms:', res.data.message)
        }
      } catch (error) {
        console.error('Error getRooms function', error)
      }
    },
    //更新房間資料
    async updateRoom() {
      try {
        let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`
        let httpMethod = 'post'
        // 如果是編輯的話則把api跟呼叫方式更改
        if (this.newRoom === false) {
          api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${this.tempRoomData.id}`
          httpMethod = 'put'
        }
        //要使用中括號js動態屬性存取語法
        const res = await axios[httpMethod](api, { data: this.tempRoomData })
        if (res.data.success == true) {
          console.log('Successful update room')
          // 重新取得房間資料
          this.getRooms()
          this.toastTitle = 'Update Success'
          this.toastContent = ''
          this.toastSuccess = true
          this.toastShow()
        } else {
          console.log('Error update room')
          this.toastTitle = 'Update Failed'
          this.toastContent = res.data.message.join('、')
          this.toastSuccess = false
          this.toastShow()
        }
      } catch (error) {
        console.log('Error update function', error)
      }
    },
    //刪除房間資料
    async deleteRoom(room) {
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${room.id}`
        const res = await axios.delete(api)
        if (res.data.success == true) {
          console.log('Successful delete room')
          // 重新取得房間資料
          this.getRooms()
          this.toastTitle = 'Delete Success'
          this.toastContent = ''
          this.toastSuccess = true
          this.toastShow()
        } else {
          console.log('Error delete room')
          this.toastTitle = 'Delete Failed'
          this.toastContent = ''
          this.toastSuccess = false
          this.toastShow()
        }
      } catch (error) {
        console.log('Error delete function', error)
      }
    },
    //上傳圖片
    async uploadFile() {
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
          this.tempRoomData.imageUrl = res.data.imageUrl
          this.toastTitle = 'Update Success'
          this.toastContent = ''
          this.toastSuccess = true
          this.toastShow()
        } else {
          console.log('Error upload img')
          this.toastTitle = 'Update Failed'
          this.toastContent = res.data.message.join('、')
          this.toastSuccess = false
          this.toastShow()
        }
      } catch (error) {
        console.log('Error upload img function', error)
      }
    },
  },
})
