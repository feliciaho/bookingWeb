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
    // 驗證使用者登入狀態
    async login() {
      try {
        const api = `${import.meta.env.VITE_APP_API}admin/signin`
        const res = await this.axios.post(api, this.user)
        if (res.data.success === true) {
          const { token, expired } = res.data;
          document.cookie = `hexToken =${token}; expires=${new Date(expired)}`;
          // 驗證正確跳轉後台畫面
          this.$router.push('/dashBoard');
        } else {
          // 如果登入失敗，則清空使用者資料
          this.user.username = '';
          this.user.password = '';
          // 顯示錯誤訊息
          document.querySelector('.login-form_error').style.display ='block';
        }
      } catch (error) {
        console.error('Login function failed: ', error)
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
        <p class="login-form_error">email or password error</p>
      </form>
    </section>
  </main>
</template>
