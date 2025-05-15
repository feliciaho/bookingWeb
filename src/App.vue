<script>
//app.vue
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterCom from './components/FooterCom.vue';
export default {
  components: {
    NavBar,
    FooterCom,
    RouterView,
  }
}
</script>

<template>
  <body>
    <NavBar></NavBar>
    <RouterView></RouterView>
    <FooterCom></FooterCom>
  </body>
</template>
