<script>
import { mapState, mapActions, mapWritableState } from 'pinia';
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import roomsView from '@/stores/roomsView';
import userCart from '@/stores/userCart';
import toast from '@/stores/toastStore';

export default {
  name: 'RoomListCard',
  components: {
    Flatpickr,
  },
  props: {
    book: {
      type: Boolean,
      default: false,
    },
    viewOrCart: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    dateOptions: {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      enableTime: false,
      validDateSet: true,
    },
  }),
  computed: {
    ...mapState(roomsView, ['roomData']),
    ...mapWritableState(userCart, ['cartData', 'checkIn', 'checkOut']),
    // 計算入住天數
    stayNights() {
      if (this.checkIn && this.checkOut) {
        //  new Date()格式 Thu Jun 26 2025 08:00:00 GMT+0800 (GMT+08:00)
        const inDate = new Date(this.checkIn);
        const outDate = new Date(this.checkOut);
        // new Date()會回傳毫秒數 所以要用除以1000(毫秒)*60(秒)*60(分)*24(小時)轉成天數
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff
      }
      return null; // 如果沒有選擇日期則回傳0
    },
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
    ...mapActions(userCart, ['addCart', 'getCart', 'removeCart', 'updateCart']),
    ...mapActions(toast, ['toastFailed']),
    // 驗證日期入住日不能大於退房日
    validDate() {
      if (this.checkIn && this.checkOut && new Date(this.checkIn) >= new Date(this.checkOut)) {
        // 如果入住日大於或等於退房日，則清空日期
        this.checkIn = null
        this.checkOut = null
        this.validDateSet = false; // 設定validDateSet為false
      }
    },
    async bookRoom(roomId, stayNights) {
      try {
        //如果沒有選擇日期則return
        if (!this.checkIn || !this.checkOut || !this.validDateSet) {
          this.toastFailed('Error Date', 'Please select both check-in and check-out dates.');
          return;
        }
        // 呼叫addCart方法，傳入房間ID和入住天數
        await this.addCart(roomId, stayNights);
        // 成功後導向到購物車步驟1
        this.$router.push('/booking/stepView1');
      } catch (error) {
        console.error('Error booking room', error);
        this.toastFailed('Error booking room', "");
        return;
      }
    },
    async updateRoom(roomId, stayNights) {
      try {
        //如果沒有選擇日期則return
        if (!this.checkIn || !this.checkOut || !this.validDateSet) {
          this.toastFailed('Error Date', 'Please select both check-in and check-out dates.');
          return;
        }
        // 呼叫addCart方法，傳入房間ID和入住天數
        await this.updateCart(roomId, stayNights);
        // 成功後導向到購物車步驟1
      } catch (error) {
        console.error('Error booking room', error);
        this.toastFailed('Error booking room', "");
        return;
      }
    },
  },
  mounted() {
    // 判斷是在roomsView還是在cart
    if (!this.viewOrCart) {
      this.getCart();
    }
  },
  // 監聽日期變化
  watch: {
    checkIn: 'validDate',
    checkOut: 'validDate',
  },
}
</script>
<template>
  <!-- 判斷是在roomsView還是在cart -->
  <div class="room-card" v-for="(room, index) in this.viewOrCart ? roomData : cartData" :key="index">
    <div :class="`room-card_image room-card_image-${this.viewOrCart ? room.unit : room.product.unit}`"></div>
    <div class="room-card_content">
      <div class="room-card_text">
        <h3 class="room-card_title">{{ this.viewOrCart ? room.title : room.product.title }}</h3>
        <p class="room-card_description">{{ this.viewOrCart ? room.description : room.product.description }}</p>
        <div class="room-card_info">
          <span>
            <img src="@/assets/images/icon/bed.png">
            {{ viewOrCart ? room.category / 2 : room.product.category / 2 }} bedroom{{ (viewOrCart ? room.category :
              room.product.category) > 2 ? 's' : '' }}
          </span>
          <span>
            <img src="@/assets/images/icon/guest.png">
            {{ this.viewOrCart ? room.category : room.product.category }} guests
          </span>
          <span>
            <img src="@/assets/images/icon/area.png">
            {{ this.viewOrCart ? room.unit : room.product.unit }}
          </span>
          <span>
            <img src="@/assets/images/icon/shower.png">
            1 bathroom
          </span>
        </div>
        <div class="room-card_facilities">Available Facilities:
          <!-- 用split將回傳的字串轉成陣列 -->
          <ul>
            <li v-for="(facility, index) in this.viewOrCart ? room.content.split(',') : room.product.content.split(',')"
              :key="index + 'facilities'">{{ facility }}</li>
          </ul>
        </div>
        <div class="quick-booking_form-room" v-if="!viewOrCart">
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check in</label>
            <Flatpickr v-model="this.checkIn" :config="dateOptions" placeholder="Select date"
              @change="updateRoom(room.id, stayNights)"></Flatpickr>
          </div>
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check Out</label>
            <Flatpickr v-model="this.checkOut" :config="dateOptions" placeholder="Select date"
              @change="updateRoom(room.id, stayNights)"></Flatpickr>
          </div>
        </div>
      </div>
      <div class="room-card_butArea">
        <div class="room-card_price">
          <div class="room-card_price-night">
            <span class="price">${{ this.viewOrCart ? room.price : room.product.price }}.00</span>
            <span class="currency"> USD</span>
          </div>
          <span class="currency">price/per night</span>
        </div>
        <div class="room-card_button">
          <!-- addCart 帶入房間id跟stayNights計算過後的天數 -->
          <button class="room-card_button-add common-button" @click="bookRoom(room.id, stayNights)" v-if="book">Book
            Now</button>
        </div>
      </div>
    </div>
  </div>
</template>
