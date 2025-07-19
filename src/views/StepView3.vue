<script>
import { mapActions, mapState } from 'pinia';
import BookingStep from '@/components/BookingStep.vue';
import loadingStore from '@/stores/loadingStore'
import toast from '@/stores/toastStore';
import axios from 'axios';

export default {
  name: 'BookingStep3',
  components: {
    BookingStep,
  },
  data: () => ({
    order: {}
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(toast, ['toastFailed', 'toastSuccess']),
    // 獲取訂單資料
    async getOrder() {
      this.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/order/${this.$route.params.orderId}`;
        const res = await axios.get(api)
        if (res.data.success == true) {
          this.order = res.data.order;
        }
      } catch (error) {
        console.error('Error getOrder function', error)
      } finally {
        this.stopLoading();
      }
    },
    // 支付訂單
    async payOrder() {
      this.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/pay/${this.$route.params.orderId}`;
        const res = await axios.post(api)
        if (res.data.success == true) {
          this.toastSuccess('Payment Successful', 'Thank you for your payment!');
          // 更新訂單狀態
          this.getOrder();
        } else {
          this.toastFailed('Payment Failed', res.data.message);
        }
      } catch (error) {
        console.error('Error pay function', error)
      } finally {
        this.stopLoading();
      }
    },
  },
  created() {
    this.getOrder();
  },
}
</script>
<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <main class="booking-step_3">
    <section class="booking-complete">
      <BookingStep :stepActive="3" />
      <div class="booking-complete_area">
        <h2 class="booking-complete_title common-title">Booking Summary</h2>
        <form class="booking-complete_form" @submit.prevent="payOrder()">
          <ul class="booking-complete_list" v-if="order.user">
            <li>Name: {{ order.user.name }}</li>
            <li><img src="@/assets/images/icon/email.png">Email: {{ order.user.email }}</li>
            <li><img src="@/assets/images/icon/phone.png">Phone: {{ order.user.tel }}</li>
            <div v-for="(room, key) in order.products" :key="key">
              <li><img src="@/assets/images/icon/bed.png">Room: {{ room.product.title }}</li>
              <li><img src="@/assets/images/icon/guest.png">Guest: {{ room.product.category }} guests(maximum)</li>
              <li><img src="@/assets/images/icon/date.png">Date: {{ order.user.address }} | {{ room.qty }} Night{{
                room.qty > 1 ? 's' : '' }}</li>
              <li><img src="@/assets/images/icon/time.png">Check In : 15:00 pm. , Check Out : 11:00 am.</li>
              <li class="red" v-if="!order.is_paid">Please finish payment.</li>
              <li class="green" v-if="order.is_paid">Completed! We have sent the receipt details to your email.</li>
            </div>
          </ul>
          <div class="room-card_price">
            <div class="room-card_price-night">
              <span class="price">$ {{ order.total }}.00</span>
              <span class="currency">USD</span>
            </div>
            <span class="pernight">total price</span>
          </div>
          <div class="booking-form_group-button">
            <button v-if="!order.is_paid" type="submit" class="booking-complete_button common-button">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
