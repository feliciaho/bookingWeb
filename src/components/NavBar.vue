# Options API
<script>
export default {
  name: 'NavBar'
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
      <ul class="nav_menu">
        <li>
          <RouterLink to="/homeView">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/aboutView">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/exploreView">Explore</RouterLink>
        </li>
        <li>
          <RouterLink to="/roomsView">Rooms</RouterLink>
        </li>
        <!-- <li><a href="#"><img src="@/assets/images/icon/account.png"></a></li> -->
        <!-- <li><a href="#"><img src="@/assets/images/icon/cart.png"></a></li> -->
      </ul>
    </div>
  </nav>
</template>
