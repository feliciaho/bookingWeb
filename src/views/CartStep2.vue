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
  <main class="cart-step_2">
    <section class="booking-form">
      <BookingStep :stepActive="2" />
      <form class="booking-form_area">
        <div class="booking-form_group">
          <label for="name" class="booking-form_label">Full Name</label>
          <input type="text" id="name" class="booking-form_input" placeholder="Enter your name (as per passport)">
        </div>
        <div class="booking-form_group">
          <label for="email" class="booking-form_label">Email Address</label>
          <input type="email" id="email" class="booking-form_input" placeholder="Enter your email">
        </div>
        <div class="booking-form_group">
          <label for="phone" class="booking-form_label">Phone Number</label>
          <input type="tel" id="phone" class="booking-form_input" placeholder="Enter your contact number">
        </div>
        <div class="booking-form_group">
          <label for="payment" class="booking-form_label">Payment Method</label>
          <select id="payment" class="booking-form_select">
            <option value="">Select a payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div class="booking-form_group">
          <label for="requests" class="booking-form_label">Special Requests</label>
          <textarea id="requests" class="booking-form_textarea" placeholder="Enter any special requests"></textarea>
        </div>
        <div class="booking-form_group-button">
          <button type="submit" class="booking-form_button common-button">
            <RouterLink to="/cart/step3">
            </RouterLink>
            Proceed to Payment
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
