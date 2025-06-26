<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import ToastCom from '@/components/ToastCom.vue';
import BookingStep from '@/components/BookingStep.vue';
import RoomList from '@/components/RoomList.vue';
import userCart from '@/stores/userCart';


export default {
  name: 'CartStep1',
  components: {
    BookingStep,
    RoomList,
    ToastCom
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
    ...mapState(loadingStore, ['isloading']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(userCart, ['removeCart']),

  },
  // 在組件掛載時檢查是否為重新載入頁面
  // mounted() {
  //   // 只在瀏覽器重新整理（reload）時才跳轉，避免首次進入也被判斷為 reload
  //   if (window.performance) {
  //     const navEntries = performance.getEntriesByType("navigation");
  //     const navType = navEntries.length ? navEntries[0].type : performance.navigation.type === 1 ? 'reload' : '';
  //     if (navType === 'reload') {
  //       this.$router.replace('/roomsView');
  //       console.log('Page reloaded, redirecting to /roomsView');
  //     }
  //   }
  // },
}
</script>
<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <ToastCom />
  <main class="cart-step_1">
    <section class="booking-summary">
      <BookingStep :stepActive="1" />
      <!-- Room Section -->
      <div class="rooms_list">
        <RoomList :book="false" :viewOrCart="false" />
      </div>
      <!-- Booking Summary Section -->
      <div class="booking-summary_area">
        <div class="booking-summary_list">
          <h2 class="booking-summary_title common-title">Booking Summary</h2>
          <div class="booking-summary_info-area">
            <ul class="booking-summary_info1">
              <li><img src="@/assets/images/icon/bed.png">Room: Mountain View Room</li>
              <li><img src="@/assets/images/icon/guest.png">Guest: 2 guests</li>
              <li><img src="@/assets/images/icon/date.png">Date: 11 June , 2025 - 13 June, 2025 | 2 Nights</li>
              <li><img src="@/assets/images/icon/time.png">Check In : 15:00 pm. , Check Out : 11:00 am.</li>
              <li class="red">This booking is non-refundable.</li>
            </ul>
            <ul class="booking-summary_info2">
              <li>Price Breakdown:</li>
              <li>Room rate: $10 × 2 nights = $20.00</li>
              <li>Long stay discount<small class="red"> : - $ 2.00</small>
              </li>
              <li>Cleaning fee : $ 4.00</li>
              <li>Taxes : $ 4.00</li>
            </ul>
          </div>
        </div>
        <div class="booking-summary_price">
          <div class="room-card_price">
            <div class="room-card_price-night">
              <span class="price">$ 26.00</span>
              <span class="currency">USD</span>
            </div>
            <span class="pernight">total price</span>
          </div>
          <div class="booking-summary_button-area">
            <button type="button" class="booking-summary_button common-button">
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
