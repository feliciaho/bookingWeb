<script>
//app.vue
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterCom from '@/components/FooterCom.vue';
import ToastCom from '@/components/ToastCom.vue';


export default {
  name: 'App',
  components: {
    NavBar,
    FooterCom,
    RouterView,
    ToastCom 
  }
}
</script>

<template>
  <div id="app">
    <NavBar />
    <ToastCom />
    <router-view />
    <FooterCom />
  </div>
</template>
