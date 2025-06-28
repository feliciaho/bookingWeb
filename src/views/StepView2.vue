<script>
import { mapActions, mapState } from 'pinia';
import BookingStep from '@/components/BookingStep.vue';
import ToastCom from '@/components/ToastCom.vue';
import loadingStore from '@/stores/loadingStore'
import userCart from '@/stores/userCart';
import toast from '@/stores/toastStore';
import axios from 'axios';

export default {
  name: 'BookingStep2',
  components: {
    BookingStep,
    ToastCom
  },
  data: () => ({
    form: {
      user: {
        name: '',
        email: '',
        tel: '',
        // 將入住和退房日期加入地址欄位
        address: ``,
      },
      message: '',
    },
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
    ...mapState(userCart, ['checkIn', 'checkOut']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(toast, ['toastFailed']),
    // 新增訂單
    async addOrder() {
      this.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/order`
        const order = this.form;
        const res = await axios.post(api, { data: order })
        if (res.data.success == true) {
          console.log('Successful add order')
          this.$router.push(`/booking/stepView3/${res.data.orderId}`);
        } else {
          console.error('Error add order', res.data.message)
          this.toastFailed('Error fields', res.data.message);
        }
      } catch (error) {
        console.error('Error addOrder function', error)
        this.toastFailed('Error fields', 'Please fill in all fields.');
      } finally {
        this.stopLoading();
      }
    },
    addDate() {
      // 偵測是否有重整頁面,因為date會變回空值,如果有則顯示錯誤訊息並返回booking頁面
      if (!this.checkIn || !this.checkOut) {
        this.toastFailed('Don’t refresh page', 'Please place your order again.');
        this.$router.push(`/roomsView`);
        return;
      } else {
        // 將入住和退房日期加入地址欄位
        this.form.user.address = `${this.checkIn} ~ ${this.checkOut}`;
      }
    }
  },
  mounted() {
    this.addDate();
  },
}
</script>
<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <ToastCom />
  <main class="cart-step_2">
    <section class="booking-form">
      <BookingStep :stepActive="2" />
      <form class="booking-form_area" @submit.prevent="addOrder()">
        <div class="booking-form_group">
          <label for="name" class="booking-form_label">Full Name</label>
          <input type="text" id="name" v-model="form.user.name" class="booking-form_input"
            placeholder="Enter your name (as per passport)">
        </div>
        <div class="booking-form_group">
          <label for="email" class="booking-form_label">Email Address</label>
          <input type="email" id="email" v-model="form.user.email" class="booking-form_input"
            placeholder="Enter your email">
        </div>
        <div class="booking-form_group">
          <label for="phone" class="booking-form_label">Phone Number</label>
          <input type="tel" id="tel" v-model="form.user.tel" class="booking-form_input"
            placeholder="Enter your contact number">
        </div>
        <div class="booking-form_group">
          <label for="requests" class="booking-form_label">Special Requests</label>
          <textarea id="requests" v-model="form.message" class="booking-form_textarea"
            placeholder="Enter any special requests"></textarea>
        </div>
        <div class="booking-form_group-button">
          <button type="submit" class="booking-form_button common-button">
            Next Step
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
