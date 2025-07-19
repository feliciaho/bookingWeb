import {defineStore} from 'pinia';

export default defineStore('loadingStore',{
  state:()=>({
    isloading: false,
  }),
  actions:{
    startLoading(){
      this.isloading = true;
    },
    stopLoading(){
      this.isloading = false;
    },
  }
})
