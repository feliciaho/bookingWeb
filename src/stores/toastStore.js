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
      setTimeout(() => {
        this.toastToggleSet = false
      }, 3000)
    },
    toastSuccess(title, content) {
      this.toastSuccessSet = true
      this.toastTitle = title
      this.toastContent = content
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
