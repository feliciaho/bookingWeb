# Options API
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  },
}
</script>

<template>
  <nav class="nav">
    <div class="nav_content">
      <RouterLink to="/homeView">
        <div class="nav_logo">
          <img src="../assets/images/icon/logo.png">
          <h1>Felicia Ho's Homestay</h1>
        </div>
      </RouterLink>
      <div class="nav_hamburger" @click="toggleMenu" aria-label="menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </div>
      <ul class="nav_menu" :class="{ open: menuOpen }">
        <li>
          <RouterLink to="/homeView" @click="closeMenu">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/aboutView" @click="closeMenu">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/exploreView" @click="closeMenu">Explore</RouterLink>
        </li>
        <li>
          <RouterLink to="/roomsView" @click="closeMenu">Booking</RouterLink>
        </li>
        <!-- <li>
          <RouterLink to="/cart/step1" @click="closeMenu">
            <img src="@/assets/images/icon/cart.png" alt="cart">
          </RouterLink>
        </li> -->
        <li>
          <RouterLink to="/loginView" @click="closeMenu">
            <img src="@/assets/images/icon/account.png" alt="user">
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
