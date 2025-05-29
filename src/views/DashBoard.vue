<script>
import { mapState, mapActions } from 'pinia';
import modalToogle from '@/stores/modalToogle';
import loadingStore from '@/stores/loadingStore';
import DashboardModal from '@/components/DashboardModal.vue';

export default {
  components: {
    DashboardModal,
  },
  data: () => ({
    rooms: [],
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(modalToogle, ['showModal', 'closeModal']),
    // 驗證用者登入狀態
    async initDashboard() {
      try {
        // 開始載入loading動畫
        this.startLoading();
        // 取得 token 從 cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 將 header 夾帶 token
        this.axios.defaults.headers.common.Authorization = `${token}`;
        const api = `${import.meta.env.VITE_APP_API}api/user/check`
        const res = await this.axios.post(api, this.user)
        if (res.data.success == true) {
          console.log('Successful setting token');
          this.getRooms();
        } else {
          console.error('Error setting token:', res.data.message);
          // 如果驗證失敗，則重定向到登入頁面
          this.$router.push('/loginView');
        }
      } catch (error) {
        console.error('Error setting token function', error);
      }
      finally {
        // 結束載入loading動畫
        this.stopLoading();
      }
    },
    // 取得房間資料
    async getRooms() {
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products`
        const res = await this.axios.get(api, this.user)
        if (res.data.success == true) {
          this.rooms = res.data.products;
        } else {
          console.error('Error getRooms:', res.data.message);
        }
      } catch (error) {
        console.error('Error getRooms function', error);
      }
    }
  },
  created() {
    this.initDashboard();
  }
}
</script>
<template>
  <main class="dashboard">
    <LoadingOverlay :active="isloading"></LoadingOverlay>
    <section class="room-table">
      <DashboardModal />
      <h1 class="room-table_title common-title">Dashboard</h1>
      <p class="room-table_subtitle common-subtitle">Welcome to Felicia Ho's Homestay Dashboard.</p>
      <button class="room-table_btn-add" @click="showModal">add room</button>
      <table class="room-table_area">
        <thead class="room-table_head">
          <tr class="room-table_row">
            <th class="room-table_header">title</th>
            <th class="room-table_header">price</th>
            <th class="room-table_header">enabled</th>
            <th class="room-table_header">edit</th>
          </tr>
        </thead>
        <tbody class="room-table_body">
          <tr class="room-table_row" v-for="room in rooms" :key="room.id">
            <td class="room-table_cell">{{ room.title }}</td>
            <td class="room-table_cell">{{ room.price }}</td>
            <td class="room-table_cell">
              <span class="room-table_status-able" v-if="room.is_enabled == 1">abled</span>
              <span class="room-table_status-enabled" v-else>enabled</span>
            </td>
            <td class="room-table_cell">
              <button class="room-table_btn-edit">edit</button>
              <button class="room-table_btn-delete">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
