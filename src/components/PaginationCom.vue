<script>
import { mapState, mapActions } from 'pinia';
import dashboard from '@/stores/dashboard';

export default{
  data: () =>({
  }),
  computed: {
    ...mapState(dashboard, ['pagination']),
  },
  methods:{
    ...mapActions(dashboard, ['getRooms']),
    // 切換頁面,如果當前頁面與點擊的頁面相同則不執行,如果不同則帶入頁面參數重新取得資料
    switchPage(page){
      if( page === this.pagination.current_page){
        return;
      }else{
        this.getRooms(page);
      }
    }
  }
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
