<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import modalToggle from '@/stores/modalToggle';
import loadingStore from '@/stores/loadingStore';
import dashboard from '@/stores/dashboard';
import DashboardModal from '@/components/DashboardModal.vue';
import PaginationCom from '@/components/PaginationCom.vue';


export default {
  name: 'DashBoard',
  components: {
    DashboardModal,
    PaginationCom
  },
  data: () => ({
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
    ...mapState(modalToggle, ['modalToggleSet']),
    ...mapWritableState(dashboard, ['rooms', 'tempRoom', 'newRoom', 'orders', 'tabToggle', 'orderDetailsData']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(modalToggle, ['showModal', 'closeModal']),
    ...mapActions(dashboard, ['getRooms', 'deleteRoom', 'getOrders', 'deleteOrder', 'orderDetails']),
    // 驗證用者登入狀態
    async initDashboard() {
      try {
        // 開始載入loading動畫
        this.startLoading();
        // 取得 token 從 cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 將 header 夾帶 token
        this.axios.defaults.headers.common.Authorization = `${token}`;
        const api = `${import.meta.env.VITE_APP_API}v2/api/user/check`
        const res = await this.axios.post(api, this.user)
        if (res.data.success == true) {
          this.getRooms();
        } else {
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
    // 新增或編輯房間
    addRoom(isNew, item) {
      // 如果不是新的資料則解構取得的資料顯示
      if (isNew === false) {
        // 使用淺拷貝：複製 item 的所有屬性到 tempRoom
        // 使用展開運算子避免直接修改原始 item
        this.tempRoom = { ...item };
        // Array.isArray 用來檢查變數是否為陣列（Array），
        // 如果不是陣列（例如 undefined、null、字串、物件等），就將它設定成空陣列 []，
        // 這樣後面使用展開運算子（淺拷貝）才不會報錯。
        if (!Array.isArray(item.imagesUrl)) {
          item.imagesUrl = ['','','','']
        }
        // 使用淺拷貝確認imagesUrl不會被誤判成字串進行for迴圈，而是會被判斷為array
        this.tempRoom.imagesUrl = [...item.imagesUrl]
        this.newRoom = false;
        // 如果是新的資料則重新回空值
      } else {
        this.tempRoom = {
          // 一定要加，因為一開始沒有這個值，直接加上四個空值這樣才可以填寫input
          imagesUrl: ['','','',''],
        };
        this.newRoom = true;
      };
      // 彈跳視窗
      this.showModal();
    },

  },
  created() {
    this.initDashboard();
    this.getOrders();
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
      <div class="room-table_btns">
        <button class="room-table_btn room-table_btn-tab" @click="tabToggle = 'room'"
          :class="{ active: tabToggle === 'room' }">Room</button>
        <button class="room-table_btn room-table_btn-tab" @click="tabToggle = 'order'"
          :class="{ active: tabToggle === 'order' }">Order</button>
      </div>
      <!-- room -->
      <button class="room-table_btn room-table_btn-add" v-if="tabToggle === 'room'" @click="addRoom(true)">add
        room</button>
      <table class="room-table_area" v-if="tabToggle === 'room'">
        <thead class="room-table_head">
          <tr class="room-table_row">
            <th class="room-table_header">title</th>
            <th class="room-table_header">price</th>
            <th class="room-table_header">able to book</th>
            <th class="room-table_header">edit</th>
          </tr>
        </thead>
        <tbody class="room-table_body">
          <tr class="room-table_row" v-for="room in rooms" :key="room.id">
            <td class="room-table_cell">{{ room.title }}</td>
            <td class="room-table_cell">${{ room.price }}.00 USD</td>
            <td class="room-table_cell">
              <span class="room-table_status-abled" v-if="room.is_enabled == 1">abled</span>
              <span class="room-table_status-enabled" v-else>enabled</span>
            </td>
            <td class="room-table_cell">
              <button class="room-table_btn room-table_btn-edit" @click="addRoom(false, room)">edit</button>
              <button class="room-table_btn room-table_btn-delete" @click="deleteRoom(room)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- order -->
      <table class="room-table_area" v-if="tabToggle === 'order'">
        <thead class="room-table_head">
          <tr class="room-table_row">
            <th class="room-table_header">customer</th>
            <th class="room-table_header">status</th>
            <th class="room-table_header">order ID</th>
            <th class="room-table_header">order info</th>
          </tr>
        </thead>
        <tbody class="room-table_body">
          <tr class="room-table_row" v-for="order in orders" :key="order.id">
            <td class="room-table_cell">{{ order.user.name }}</td>
            <td class="room-table_cell">
              <span class="room-table_status-enabled" v-if="order.is_paid == false">not paid</span>
              <span class="room-table_status-abled" v-else>paid</span>
            </td>
            <td class="room-table_cell" style="white-space: nowrap">{{ order.id }}</td>
            <td class="room-table_cell">
              <button class="room-table_btn room-table_btn-edit" @click="orderDetails(order)">more</button>
              <button class="room-table_btn room-table_btn-delete" @click="deleteOrder(order)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationCom />
    </section>
  </main>
</template>
