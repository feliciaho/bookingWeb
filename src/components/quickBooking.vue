# Options API
<script>
import { mapActions, mapWritableState } from 'pinia'
import roomsView from '@/stores/roomsView';
import userCart from '@/stores/userCart';
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import toast from '@/stores/toastStore';

export default {
  name: 'quickBooking',
  components: {
    Flatpickr,
  },
  data: () => ({
    guests: 1,
    bedrooms: 1,
    dateOptions: {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      enableTime: false,
    },
  }),
  computed: {
    ...mapWritableState(roomsView, ['categoryData']),
    ...mapWritableState(userCart, ['checkIn', 'checkOut']),
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
    ...mapActions(toast, ['toastFailed']),
    // 搜尋房間
    async search() {
      try {
        //如果沒有選擇日期則return
        if (!this.checkIn || !this.checkOut) {
          this.toastFailed('Error Date', 'Please select both check-in and check-out dates.');
          return;
        }
        // 如果房客人數大於2或臥室數量大於1，則設定類別為4，否則為2
        if (this.guests > 2 || this.bedrooms > 1) {
          this.categoryData = 4;
        } else {
          this.categoryData = 2;
        }
        // 重新取得房間資料
        await this.getRoomsData();
        // 導向到房間列表頁面
        this.$router.push('/roomsView');
      } catch (error) {
        console.error('Error search', error);
      }
    },
    // 驗證日期入住日不能大於退房日
    validDate() {
      if (this.checkIn && this.checkOut && new Date(this.checkIn) >= new Date(this.checkOut)) {
        // 如果入住日大於或等於退房日，則清空日期
        this.checkIn = null
        this.checkOut = null
      }
    },
  },
  // 監聽日期變化
  watch: {
    checkIn: 'validDate',
    checkOut: 'validDate',
  },
}
</script>

<template>
  <!-- Quick Booking Section -->
  <section class="quick-booking">
    <div class="quick-booking_form">
      <div class="quick-booking_group">
        <label><img src="@/assets/images/icon/guest.png">Guests</label>
        <select v-model="guests">
          <option v-for="n in 4" :key="n + 'guests'" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="quick-booking_group">
        <label><img src="@/assets/images/icon/bed.png">Total Bedrooms</label>
        <select v-model="bedrooms">
          <option v-for="n in 2" :key="n + 'bedrooms'" :value="n">{{ n }} Bedroom{{ n > 1 ? 's' : '' }}</option>
        </select>
      </div>
      <div class="quick-booking_group">
        <label><img src="@/assets/images/icon/date.png">Check in</label>
        <Flatpickr v-model="this.checkIn" :config="dateOptions" placeholder="Select date" />
      </div>
      <div class="quick-booking_group">
        <label><img src="@/assets/images/icon/date.png">Check out</label>
        <Flatpickr v-model="this.checkOut" :config="dateOptions" placeholder="Select date" />
      </div>
      <button class="quick-booking_button common-button" @click="search()">Search</button>
    </div>
  </section>
</template>
