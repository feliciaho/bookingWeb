<script>
import { mapState, mapActions } from 'pinia';
import{ Pagination }from 'swiper/modules'
import roomsView from '@/stores/roomsView';

export default {
  name: 'RoomCard',

  data: () => ({
    rooms: [],
    swiperModules: [Pagination]
  }),
  computed: {
    ...mapState(roomsView, ['roomData']),
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
    // 過濾房間資料，只顯示前三筆
    filterRooms() {
      this.rooms = this.roomData.slice(0, 3);
    }
  },
  async created() {
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
        <AppSwiper class="room-card_swiper" :modules="swiperModules" :pagination="true" >
          <SwiperSlide v-for="(img, index) in room.imagesUrl" :key="'img'+index">
            <img :src="img" class="room-card_image"/>
          </SwiperSlide>
        </AppSwiper>
        <!-- <div :class="`room-card_image room-card_image-${room.unit}`"></div> -->
        <div class="room-card_content">
          <h3 class="room-card_title">{{ room.title }}</h3>
          <p class="room-card_description">{{ room.description }}</p>
          <div class="room-card_info">
            <span>
              <img src="@/assets/images/icon/bed.png">
              {{ room.category / 2 }} Bed
            </span>
            <span>
              <img src="@/assets/images/icon/area.png">
              {{ room.unit }}
            </span>
          </div>
          <div class="room-card_price">
            <div class="room-card_price-night">
              <span class="price">$ {{ room.origin_price }}.00</span>
              <span class="currency">USD</span>
            </div>
            <span class="pernight">price/per night</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
