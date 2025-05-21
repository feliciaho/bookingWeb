<script>
export default {
  name: 'RoomCard',
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
      <div class="room-card">
        <div class="room-card_image room-card_image--mountain"></div>
        <div class="room-card_content">
          <h3 class="room-card_title">Mountain View Room</h3>
          <p class="room-card_description">Embrace the Serenity of the Mountains</p>
          <div class="room-card_info">
            <span>
              <img src="@/assets/images/icon/bed.png">
              1 bedroom
            </span>
            <span>
              <img src="@/assets/images/icon/area.png">
              214m2
            </span>
          </div>
          <div class="room-card_price">
            <span class="price">$ 10.00</span>
            <span class="currency">USD</span>
          </div>
        </div>
      </div>

      <!-- Pool View Room -->
      <div class="room-card">
        <div class="room-card_image room-card_image--pool"></div>
        <div class="room-card_content">
          <h3 class="room-card_title">Pool View Room</h3>
          <p class="room-card_description">Soak in the Breathtaking Pool Views</p>
          <div class="room-card_info">
            <span><img src="@/assets/images/icon/bed.png">1 bedroom</span>
            <span><img src="@/assets/images/icon/area.png">220m2</span>
          </div>
          <div class="room-card_price">
            <span class="price">$ 12.00</span>
            <span class="currency">USD</span>
          </div>
        </div>
      </div>

      <!-- Tropics Forest Room -->
      <div class="room-card">
        <div class="room-card_image room-card_image--tropics"></div>
        <div class="room-card_content">
          <h3 class="room-card_title">Tropics Forest Room</h3>
          <p class="room-card_description">Bask in the Charm of the Tropics</p>
          <div class="room-card_info">
            <span><img src="@/assets/images/icon/bed.png">1 bedroom</span>
            <span><img src="@/assets/images/icon/area.png">210m2</span>
          </div>
          <div class="room-card_price">
            <span class="price">$ 8.00</span>
            <span class="currency">USD</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
