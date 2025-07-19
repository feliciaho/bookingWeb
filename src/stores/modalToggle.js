import {defineStore} from 'pinia';

export default defineStore('modalToggle',{
  state:()=>({
    modalToggleSet: false,
  }),
  actions:{
    showModal(){
      this.modalToggleSet = true;
    },
    closeModal(){
      this.modalToggleSet = false;
    },
  }
})
