<script>
export default {
  name: 'LoginView',
  data: () => ({
    user: {
      username: '',
      password: '',
    }
  }),
  methods: {
    async login() {
      try {
        const api = `${import.meta.env.VITE_APP_API}admin/signin`
        const res = await this.axios.post(api, this.user)
        console.log('Login successful', res)
      } catch (error) {
        console.error('Login failed', error)
      }
    }
  }
}
</script>
<template>
  <main class="login">
    <section class="login-form">
      <form class="login-form_area" @submit.prevent="login">
        <div class="nav_logo">
          <img src="../assets/images/icon/logo.png">
          <h1>Felicia Ho's Homestay</h1>
        </div>
        <input type="email" id="email" class="login-form_input" placeholder="Email" v-model="user.username">
        <input type="password" id="password" class="login-form_input" placeholder="Password" v-model="user.password">
        <button type="submit" class="login-form_button common-button">
          Login
        </button>
      </form>
    </section>
  </main>
</template>
