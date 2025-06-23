<script>
export default {
  name: 'BookingStep',
  props: {
    stepActive: {
      type: Number,
      required: true
    }
  }
}
</script>
<template>
  <div class="booking-step">
    <span class="booking-step_subtitle common-subtitle">Book Now!</span>
    <h2 class="booking-step_title common-title">Cart</h2>
    <div class="booking-step_area">
      <div class="booking-step_group">
        <span class="booking-step_number" :class="{active: stepActive === 1}">1</span>
        <span class="booking-step_text">Check your booking</span>
      </div>
      <div class="booking-step_line"></div>
      <div class="booking-step_group">
        <span class="booking-step_number" :class="{active: stepActive === 2}">2</span>
        <span class="booking-step_text">Fill in information</span>
      </div>
      <div class="booking-step_line"></div>
      <div class="booking-step_group">
        <span class="booking-step_number" :class="{active: stepActive === 3}">3</span>
        <span class="booking-step_text">Complete</span>
      </div>
    </div>
  </div>
</template>
