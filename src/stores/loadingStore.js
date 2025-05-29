import {defineStore} from 'pinia';

export default defineStore('loadingStore',{
  state:()=>({
    isloading: false,
  }),
  actions:{
    startLoading(){
      this.isloading = true;
      console.log('Loading started');
    },
    stopLoading(){
      this.isloading = false;
      console.log('Loading stopped');
    },
  }
})
