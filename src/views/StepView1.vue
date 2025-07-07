<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import ToastCom from '@/components/ToastCom.vue';
import toast from '@/stores/toastStore';
import BookingStep from '@/components/BookingStep.vue';
import RoomList from '@/components/RoomList.vue';
import bookingStore from '@/stores/bookingStore';

export default {
  name: 'BookingStep1',
  components: {
    BookingStep,
    RoomList,
    ToastCom
  },
  data: () => ({
    guests: 1,
    Beds: 1,
    dateOptions: {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      enableTime: false,
    },
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
    ...mapState(bookingStore, ['BookingData', 'checkIn', 'checkOut']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(bookingStore, ['removeBooking', 'getBooking']),
    ...mapActions(toast, ['toastFailed']),
    refreshCheck() {
      // 偵測是否有重整頁面,因為date會變回空值,如果有則顯示錯誤訊息並返回booking頁面
      if (!this.checkIn || !this.checkOut) {
        this.toastFailed('Don’t refresh page', 'Please place your order again.');
        this.$router.push(`/roomsView`);
        return;
      }
    }
  },
  mounted() {
    this.refreshCheck();
  },
}
</script>
<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <ToastCom />
  <main class="booking-step_1">
    <section class="booking-summary">
      <BookingStep :stepActive="1" />
      <!-- Room Section -->
      <div class="rooms_list">
        <RoomList :book="false" :viewOrBooking="false" />
      </div>
      <!-- Booking Summary Section -->
      <div class="booking-summary_area" v-for="(item, index) in BookingData" :key="index">
        <div class="booking-summary_list">
          <h2 class="booking-summary_title common-title">Booking Summary</h2>
          <div class="booking-summary_info-area">
            <ul class="booking-summary_info1">
              <li><img src="@/assets/images/icon/bed.png">{{ item.product.title }}</li>
              <li><img src="@/assets/images/icon/guest.png">Guest: {{ item.product.category }} guests(maximum)</li>
              <li><img src="@/assets/images/icon/date.png">{{ this.checkIn }} ~ {{ this.checkOut }} | {{ item.qty }}
                Night</li>
              <li><img src="@/assets/images/icon/time.png">Check In : 15:00 pm. , Check Out : 11:00 am.</li>
              <li class="red">This booking is non-refundable.</li>
            </ul>
            <ul class="booking-summary_info2">
              <li>Price Breakdown:</li>
              <li>Room rate: ${{ item.product.origin_price }}.00 × {{ item.qty }} nights = $ {{
                (item.product.origin_price * item.qty) }}.00</li>
              <li>Long stay discount<small class="red"> : $ {{ (item.final_total
                - (item.product.origin_price * item.qty)) }}.00</small>
              </li>
            </ul>
          </div>
        </div>
        <div class="booking-summary_price">
          <div class="room-card_price">
            <div class="room-card_price-night">
              <span class="price">$ {{ item.final_total }}.00</span>
              <span class="currency">USD</span>
            </div>
            <span class="pernight">total price</span>
          </div>
          <div class="booking-summary_button-area">
            <button type="button" v-if="this.checkIn && this.checkOut" class="booking-summary_button common-button">
              <RouterLink to="/booking/stepView2">
              </RouterLink>
              Next Step
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
