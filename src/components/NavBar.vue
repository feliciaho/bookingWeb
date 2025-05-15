<script>
import SearchCom from '@/components/SearchCom.vue';
import { mapActions, mapState } from 'pinia';
import recipeStore from '@/stores/recipeStore';
import filterStore from '@/stores/filterStore';
import closeNavBarStore from '@/stores/closeNavBarStore';

export default {
  components: { SearchCom },
  computed: {
    ...mapState(recipeStore, ['recipes']),
    ...mapState(filterStore, ['searchData']),
  },
  methods: {
    ...mapActions(recipeStore, ['fetchApi']),
    ...mapActions(closeNavBarStore, ['closeNavbar']),
    toogleNavbar() {
      // 手動切換navbar-collapse的顯示狀態
      // 由於增加router後navBar無法正開合
      const navbarCollapse = document.querySelector('#navbarNavDropdown');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      } else {
        navbarCollapse.classList.add('show');
      }
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbarLogo">
      <RouterLink to="/homeView">
        <img src="../images/logo.png">Felicia Ho's Recipes
      </RouterLink>
    </div>
    <button class="navbar-toggler" id="toogleButton" type="button" aria-expanded="false" aria-label="Toggle navigation"
      @click="toogleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/homeView" @click="closeNavbar(true)">
            <img src="../images/home.png" width="25px">Home
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/popularView" @click="closeNavbar(true)">
            <img src="../images/fire.png" width="25px">Popular Recipes
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/myFavoriteView" @click="closeNavbar(true)">
            <img src="../images/removeIcon.png" width="25px">My Favorites
          </RouterLink>
        </li>
      </ul>
      <SearchCom></SearchCom>
    </div>
  </nav>
</template>
