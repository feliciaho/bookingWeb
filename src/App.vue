<script>
//app.vue
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterCom from '@/components/FooterCom.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterCom,
    RouterView,
  }
}
</script>

<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <FooterCom/>
  </div>
</template>
