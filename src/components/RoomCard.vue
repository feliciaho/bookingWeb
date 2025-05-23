<script>
export default {
  name: 'RoomCard',
  data() {
    return {
      rooms: [
        {
          image: 'mountain',
          title: 'Mountain View Room',
          description: 'Embrace the Serenity of the Mountains',
          bedroom: 1,
          guests: 2,
          area: '214m2',
          price: 10.00,
        },
        {
          image: 'pool',
          title: 'Pool View Room',
          description: 'Soak in the Breathtaking Pool Views',
          bedroom: 1,
          guests: 2,
          area: '220m2',
          bathroom: 1,
          price: 12.00,
        },
        {
          image: 'tropics',
          title: 'Tropics Forest Room',
          description: 'Bask in the Charm of the Tropics',
          bedroom: 1,
          guests: 2,
          area: '210m2',
          price: 8.00,
        },
      ],
    }
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
        <div :class= "`room-card_image room-card_image-${ room.image }`"></div>
        <div class="room-card_content">
          <h3 class="room-card_title">{{ room.title }}</h3>
          <p class="room-card_description">{{ room.description }}</p>
          <div class="room-card_info">
            <span>
              <img src="@/assets/images/icon/bed.png">
              {{ room.bedroom }} bedroom
            </span>
            <span>
              <img src="@/assets/images/icon/area.png">
              {{ room.area }}
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
