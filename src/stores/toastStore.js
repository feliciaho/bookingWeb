import { defineStore } from 'pinia'

export default defineStore('toastStore', {
  state: () => ({
    toastTitle: '',
    toastContent: '',
    toastSuccessSet: false,
    toastToggleSet: false,
  }),
  actions: {
    toastShow() {
      this.toastToggleSet = true
      console.log('toastSuccess6666')
      setTimeout(() => {
        this.toastToggleSet = false
      }, 3000)
    },
    toastSuccess(title, content) {
      this.toastSuccessSet = true
      this.toastTitle = title
      this.toastContent = content
      console.log('toastSuccess8888888888')
      this.toastShow()
    },
    toastFailed(title, content) {
      this.toastSuccessSet = false
      this.toastTitle = title
      this.toastContent = content
      this.toastShow()
    }
  }
})
