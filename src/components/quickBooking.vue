# Options API
<script>
import { mapActions, mapWritableState } from 'pinia'
import roomsView from '@/stores/roomsView';
import userCart from '@/stores/userCart';
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';


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
    async search() {
      try {
        // 如果房客人數大於2或臥室數量大於1，則設定類別為4，否則為2
        if (this.guests > 2 || this.bedrooms > 1) {
          this.categoryData = 4;
          console.log(this.categoryData);
        } else {
          this.categoryData = 2;
        }
        // 重新取得房間資料
        await this.getRoomsData();
      } catch (error) {
        console.error('Error search', error);
      } finally {
        // 導向到房間列表頁面
        this.$router.push('/roomsView');
      }
    },
  }
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
