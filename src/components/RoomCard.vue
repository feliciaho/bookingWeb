<script>
import { mapState, mapActions } from 'pinia';
import roomsView from '@/stores/roomsView';

export default {
  name: 'RoomCard',
  data: () => ({
    rooms: [],
  }),
  computed: {
    ...mapState(roomsView, ['roomData']),
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
    // 過濾房間資料，只顯示類別為2的房間
    filterRooms() {
      this.rooms = this.roomData.filter(room => room.category === "2");
    },
  },
  async mounted() {
    await this.getRoomsData();
    this.filterRooms();
  },
}

</script>
<template>
  <section class="rooms">
    <div class="rooms_header">
      <span class="rooms_subtitle common-subtitle">Explore Our Offerings</span>
      <h2 class="rooms_title common-title">Embrace Bali-Inspired Luxury</h2>
    </div>
    <div class="rooms_grid">
      <!-- Mountain View Room -->
      <div class="room-card" v-for="(room, index) in rooms" :key="index">
        <div :class="`room-card_image room-card_image-${room.unit}`"></div>
        <div class="room-card_content">
          <h3 class="room-card_title">{{ room.title }}</h3>
          <p class="room-card_description">{{ room.description }}</p>
          <div class="room-card_info">
            <span>
              <img src="@/assets/images/icon/bed.png">
              {{ room.category / 2 }} bedroom
            </span>
            <span>
              <img src="@/assets/images/icon/area.png">
              {{ room.unit }}
            </span>
          </div>
          <div class="room-card_price">
            <div class="room-card_price-night">
              <span class="price">$ {{ room.price }}.00</span>
              <span class="currency">USD</span>
            </div>
            <span class="pernight">price/per night</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
