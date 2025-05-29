import {defineStore} from 'pinia';

export default defineStore('modalToogle',{
  state:()=>({
    modalToogleSet: false,
  }),
  actions:{
    showModal(){
      this.modalToogleSet = true;
      console.log('Modal is shown');
    },
    closeModal(){
      this.modalToogleSet = false;
      console.log('Modal is closed');
    },
  }
})
