<script>
import { mapWritableState, mapActions } from 'pinia';
import dashboard from '@/stores/dashboard';

export default {
  data: () => ({
  }),
  computed: {
    ...mapWritableState(dashboard, ['rooms_pagination', 'orders_pagination', 'tabToggle']),
    // 根據 tabToggle 的值來決定使用哪個分頁資料
    // 改成放在computed 中，不用擔心同步問題，只要裡面有值更動即會自動更新
    pagination() {
    return this.tabToggle === 'room' ? this.rooms_pagination : this.orders_pagination;
  }
  },
  methods: {
    ...mapActions(dashboard, ['getRooms', 'getOrders']),
    // 切換頁籤，判斷是在房間還是在訂單中
    tabToggleChange() {
      if (this.tabToggle === 'room') {
        this.pagination = this.rooms_pagination;
      } else {
        this.pagination = this.orders_pagination;
      }
    },
    // 切換頁面,如果當前頁面與點擊的頁面相同則不執行,如果不同則帶入頁面參數重新取得資料
    switchPage(page) {
      if (page === this.pagination.current_page) {
        return;
      } if (this.tabToggle === 'room') {
        this.getRooms(page);
      } else {
        this.getOrders(page);
      }
    }
  },
}
</script>
<template>
  <div class="page-navigation">
    <ul class="page-navigation_list">
      <li class="page-navigation_number" :class="{ 'disabled': pagination.has_pre === false }">
        <a href="#" @click.prevent="switchPage(pagination.current_page - 1)">Previous</a>
      </li>
      <li class="page-navigation_number" v-for="(page, key) in pagination.total_pages" :key="'page' + key"
        :class="{ 'active': pagination.current_page === page }">
        <a href="#" @click.prevent="switchPage(page)">{{ page }}</a>
      </li>
      <li class="page-navigation_number" :class="{ 'disabled': pagination.has_next === false }">
        <a href="#" @click.prevent="switchPage(pagination.current_page + 1)">Next</a>
      </li>
    </ul>
  </div>
</template>
