<script>
import { mapActions, mapState } from 'pinia';
import BookingStep from '@/components/BookingStep.vue';
import loadingStore from '@/stores/loadingStore'
import bookingStore from '@/stores/bookingStore';
import toast from '@/stores/toastStore';
import axios from 'axios';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
// 設定電話驗證規則
defineRule('tel', value => {
  if (!value || value.trim() === '') return 'Phone number is required.'
  const isValid = /^\+?[1-9]\d{6,14}$/.test(value.replace(/[\s-]/g, ''))
  return isValid ? true : 'Please enter a valid international phone number.'
});
// 設定自訂錯誤訊息顯示名稱
configure({
  generateMessage: (ctx) => {
    const fieldNames = {
      'form.user.name': 'Name',
      'form.user.email': 'Email',
      'form.user.tel': 'Phone Number',
      'form.user.payment': 'Payment method'
    }

    const field = fieldNames[ctx.field] || ctx.field

    const messages = {
      required: `${field} is required.`,
      email: `${field} must be a valid email.`,
      tel: `${field} must be a valid international phone number.`
    }

    return messages[ctx.rule.name]
  }
})

export default {
  name: 'BookingStep2',
  components: {
    BookingStep,
    Form,
    Field,
    ErrorMessage
  },
  data: () => ({
    form: {
      user: {
        name: '',
        email: '',
        tel: '',
        payment: '',
        // 將入住和退房日期加入地址欄位
        address: ``,
      },
      message: '',
    },
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
    ...mapState(bookingStore, ['checkIn', 'checkOut']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(toast, ['toastFailed']),
    // 新增訂單
    // values是veeValidate的參數
    async addOrder(values) {
      this.startLoading();
      try {
        let api = `${import.meta.env.VITE_APP_API}v2/api/${import.meta.env.VITE_APP_PATH}/order`
        const order = this.form;
        const res = await axios.post(api, { data: order })
        if (res.data.success == true) {
          this.$router.push(`/booking/stepView3/${res.data.orderId}`);
        }
      } catch (error) {
        console.error('Error addOrder function', error)
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
  <main class="booking-step_2">
    <section class="booking-form">
      <BookingStep :stepActive="2" />
      <Form class="booking-form_area" @submit="addOrder">
        <div class="booking-form_group">
          <label for="name" class="booking-form_label">Full Name</label>
          <Field type="text" id="name" name="form.user.name" rules="required" v-model="form.user.name"
            class="booking-form_input" placeholder="Enter your name (as per passport)" />
          <ErrorMessage name="form.user.name" class="invalid" />
        </div>
        <div class="booking-form_group">
          <label for="email" class="booking-form_label">Email Address</label>
          <Field type="email" id="email" name="form.user.email" rules="required|email" v-model="form.user.email"
            class="booking-form_input" placeholder="Enter your email" />
          <ErrorMessage name="form.user.email" class="invalid" />
        </div>
        <div class="booking-form_group">
          <label for="phone" class="booking-form_label">Phone Number</label>
          <Field type="tel" id="tel" name="form.user.tel" rules="required|tel" v-model="form.user.tel"
            class="booking-form_input" placeholder="Enter your contact number (EX:+886975925667)" />
          <ErrorMessage name="form.user.tel" class="invalid" />
        </div>
        <div class="booking-form_group">
          <label for="payment" class="booking-form_label">Payment Method</label>
          <Field as="select" id="payment" name="form.user.payment" rules="required" v-model="form.user.payment"
            class="booking-form_input">
            <option disabled value="">Please select a payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="cash">Apple Pay</option>
          </Field>
          <ErrorMessage name="form.user.payment" class="invalid" />
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
      </Form>
    </section>
  </main>
</template>
