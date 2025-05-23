<script>
export default {
  name: 'LoginView',
}
</script>
<template>
  <main class="login">
    <section class="login-form">
      <form class="login-form_area">
        <div class="nav_logo">
          <img src="../assets/images/icon/logo.png">
          <h1>Felicia Ho's Homestay</h1>
        </div>
        <input type="text" id="email" class="booking-form_input" placeholder="Email">
        <input type="text" id="password" class="booking-form_input" placeholder="Password">
        <button type="submit" class="login-form_button common-button">
          Login
        </button>
      </form>
    </section>
  </main>
</template>
