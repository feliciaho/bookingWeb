# Options API
<script>
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'quickBooking',
  components: {
    Flatpickr,
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
            <option v-for="n in 4" :key="n+'guests'" :value="n">{{ n }}</option>
          </select>
        </div>
        <div class="quick-booking_group">
          <label><img src="@/assets/images/icon/bed.png">Total Bedrooms</label>
          <select v-model="bedrooms">
            <option v-for="n in 5" :key="n+'bedrooms'" :value="n">{{ n }} Bedroom{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>
        <div class="quick-booking_group">
          <label><img src="@/assets/images/icon/date.png">Check in</label>
          <Flatpickr v-model="checkIn" :config="dateOptions" placeholder="Select date" />
        </div>
        <div class="quick-booking_group">
          <label><img src="@/assets/images/icon/date.png">Check out</label>
          <Flatpickr v-model="checkOut" :config="dateOptions" placeholder="Select date" />
        </div>
        <button class="quick-booking_button common-button" @click="search">Search</button>
      </div>
    </section>
</template>
