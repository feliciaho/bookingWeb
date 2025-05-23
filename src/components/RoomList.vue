<script>
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';


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
  data() {
    return {
      rooms: [
        {
          image: 'mountain',
          title: 'Pool View Room',
          description: 'Soak in the Breathtaking Pool Views',
          bedroom: 1,
          guests: 2,
          area: '220m2',
          bathroom: 1,
          facilities: [
            'One King Bed',
            'Wifi',
            'Air Condition',
            'Balcony',
            'Television',
            'Swimming Pool'
          ],
          price: 12.00,
        },
      ],
    }
  },
}
</script>
<template>
  <div class="room-card" v-for="(room, index) in rooms" :key="index">
    <div :class="`room-card_image room-card_image-${room.image}`"></div>
    <div class="room-card_content">
      <div class="room-card_text">
        <h3 class="room-card_title">{{ room.title }}</h3>
        <p class="room-card_description">{{ room.description }}</p>
        <div class="room-card_info">
          <span>
            <img src="@/assets/images/icon/bed.png">
            {{ room.bedroom }} bedroom
          </span>
          <span>
            <img src="@/assets/images/icon/guest.png">
            {{ room.guests }} guests
          </span>
          <span>
            <img src="@/assets/images/icon/area.png">
            {{ room.area }}
          </span>
          <span>
            <img src="@/assets/images/icon/shower.png">
            {{ room.bathroom }} bathroom
          </span>
        </div>
        <div class="room-card_facilities">Available Facilities:
          <ul>
            <li v-for="(i, index) in room.facilities" :key="index + 'facilities'">{{ i }}</li>
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
