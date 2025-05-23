<script>
import BookingStep from '@/components/BookingStep.vue';

export default {
  name: 'CartStep2',
  components: {
    BookingStep,
  },
}
</script>
<template>
  <main class="cart-step_3">
    <section class="booking-complete">
      <BookingStep :stepActive="3" />
      <div class="booking-complete_area">
        <h2 class="booking-complete_title common-title">Booking Complete!</h2>
        <ul class="booking-complete_list">
          <li>Name: Felicia Ho</li>
          <li><img src="@/assets/images/icon/email.png">Email: FeliciaHo@gmail.com</li>
          <li><img src="@/assets/images/icon/phone.png">Phone: +886975925667</li>
          <li><img src="@/assets/images/icon/bed.png">Room: Mountain View Room</li>
          <li><img src="@/assets/images/icon/guest.png">Guest: 2 guests</li>
          <li><img src="@/assets/images/icon/date.png">Date: 11 June , 2025 - 13 June, 2025 | 2 Nights</li>
          <li><img src="@/assets/images/icon/time.png">Check In : 15:00 pm. , Check Out : 11:00 am.</li>
          <li class="red">We have sent the receipt details to your email.</li>
        </ul>
        <div class="room-card_price">
          <div class="room-card_price-night">
            <span class="price">$ 26.00</span>
            <span class="currency">USD</span>
          </div>
          <span class="pernight">total price</span>
        </div>
      </div>
    </section>
  </main>
</template>
