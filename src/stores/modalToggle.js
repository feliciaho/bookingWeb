import {defineStore} from 'pinia';

export default defineStore('modalToggle',{
  state:()=>({
    modalToggleSet: false,
  }),
  actions:{
    showModal(){
      this.modalToggleSet = true;
      console.log('Modal is shown');
    },
    closeModal(){
      this.modalToggleSet = false;
      console.log('Modal is closed');
    },
  }
})
