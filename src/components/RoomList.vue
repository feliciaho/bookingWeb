<script>
import { mapState, mapActions } from 'pinia';
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import roomsView from '@/stores/roomsView';


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
    book: {
      type: Boolean,
      default: false,
    },
    remove: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
  }),
  computed: {
    ...mapState(roomsView, ['roomData']),
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
  },
  mounted() {
    this.getRoomsData();
  },
}
</script>
<template>
  <div class="room-card" v-for="(room, index) in this.roomData" :key="index">
    <div :class="`room-card_image room-card_image-${room.unit}`"></div>
    <div class="room-card_content">
      <div class="room-card_text">
        <h3 class="room-card_title">{{ room.title }}</h3>
        <p class="room-card_description">{{ room.description }}</p>
        <div class="room-card_info">
          <span>
            <img src="@/assets/images/icon/bed.png">
            {{ room.category / 2 }} bedroom
          </span>
          <span>
            <img src="@/assets/images/icon/guest.png">
            {{ room.category }} guests
          </span>
          <span>
            <img src="@/assets/images/icon/area.png">
            {{ room.unit }}
          </span>
          <span>
            <img src="@/assets/images/icon/shower.png">
            1 bathroom
          </span>
        </div>
        <div class="room-card_facilities">Available Facilities:
          <!-- 用split將回傳的字串轉成陣列 -->
          <ul>
            <li v-for="(facility, index) in room.content.split(',')" :key="index + 'facilities'">{{ facility }}</li>
          </ul>
        </div>
        <div class="quick-booking_form-room" v-if="remove">
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check in</label>
            <Flatpickr v-model="checkIn" :config="dateOptions" placeholder="Select date"></Flatpickr>
          </div>
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check Out</label>
            <Flatpickr v-model="checkOut" :config="dateOptions" placeholder="Select date"></Flatpickr>
          </div>
        </div>
      </div>
      <div class="room-card_butArea">
        <div class="room-card_price">
          <div class="room-card_price-night">
            <span class="price">$ {{ room.price }}.00</span>
            <span class="currency"> USD</span>
          </div>
          <span class="currency">price/per night</span>
        </div>
        <div class="room-card_button">
          <button class="room-card_button-add common-button" v-if="add">Add to Cart</button>
          <button class="room-card_button-book common-button" v-if="book">Book Now</button>
          <button class="room-card_button-remove common-button" v-if="remove">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>
