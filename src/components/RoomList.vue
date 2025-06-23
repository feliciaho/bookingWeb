<script>
import { mapState, mapActions, mapWritableState } from 'pinia';
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import roomsView from '@/stores/roomsView';
import userCart from '@/stores/userCart';

export default {
  name: 'RoomListCard',
  components: {
    Flatpickr,
  },
  props: {
    add: {
      type: Boolean,
      default: false,
    },
    remove: {
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
    },
  }),
  computed: {
    ...mapState(roomsView, ['roomData']),
    ...mapWritableState(userCart, ['cartData', 'checkIn', 'checkOut']),
    stayNights() {
      if (this.checkIn && this.checkOut) {
        const inDate = new Date(this.checkIn);
        const outDate = new Date(this.checkOut);
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 1;
      }
      return 1;
    },
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
    ...mapActions(userCart, ['addCart', 'getCart', 'removeCart']),
    getNewCheckOut(checkIn, nights) {
      if (!checkIn || !nights) return '';
      const date = new Date(checkIn);
      date.setDate(date.getDate() + nights);
      return date.toISOString().split('T')[0];
    }
  },
  mounted() {
    // 判斷是在roomsView還是在cart
    this.getRoomsData();
    if (!this.viewOrCart) {
      this.getCart();
    }
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
            {{ this.viewOrCart ? room.category / 2 : room.product.category / 2 }} bedroom
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
        <div class="quick-booking_form-room" v-if="remove">
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check in</label>
            <Flatpickr v-model="this.checkIn" :config="dateOptions" placeholder="Select date"></Flatpickr>
          </div>
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check Out</label>
            <Flatpickr :model-value="getNewCheckOut(this.checkIn, room.qty)" :config="dateOptions" placeholder="Select date"></Flatpickr>
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
          <button class="room-card_button-add common-button" @click="addCart(room.id, stayNights)" v-if="add">Add to
            Cart</button>
          <button class="room-card_button-remove common-button" @click="removeCart(room.id)"
            v-if="remove">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>
