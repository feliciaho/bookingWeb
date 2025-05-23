<script>
import BookingStep from '@/components/BookingStep.vue';
import RoomList from '@/components/RoomList.vue';


export default {
  name: 'CartStep2',
  components: {
    BookingStep,
    RoomList,
  },
}
</script>
<template>
  <main class="cart-step_1">
    <section class="booking-summary">
      <BookingStep :stepActive="1" />
      <!-- Room Section -->
      <div class="rooms_list">
        <RoomList :add="false" :book="false" :remove="true" />
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
              <li>Long stay discount<samll class="red"> : - $ 2.00</samll>
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
              <RouterLink to="/cartStep2">
              </RouterLink>
                Next Step
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
