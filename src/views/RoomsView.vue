<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import HeroCom from '@/components/HeroCom.vue';
import QuickBooking from '@/components/quickBooking.vue';
export default {
  name: 'HomeView',
  components: {
    HeroCom,
    QuickBooking,
  },
  computed: {
    ...mapState(loadingStore, ['isloading']),
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
  },
}
</script>

<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <main class="roomsView">
    <!-- Hero Section -->
    <HeroCom title="Rooms"
      text="Felicia Murniati Homestay offers thoughtfully designed rooms that blend comfort with a Bali-inspired aesthetic. Each room is crafted to provide a relaxing retreat, surrounded by natural elements and warm hospitality." />
    <!-- Room Cards Section -->
    <section class="rooms">
      <div class="rooms_header">
        <span class="rooms_subtitle common-subtitle">Explore Our Offerings</span>
        <h2 class="rooms_title common-title">Embrace Bali-Inspired Luxury</h2>
      </div>
      <!-- Quick Booking Section -->
      <QuickBooking />
      <div class="rooms_list">
        <!-- Mountain View Room -->
        <div class="room-card">
          <div class="room-card_image room-card_image--mountain"></div>
          <div class="room-card_content">
            <div class="room-card_text">
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
                <span>
                  <img src="@/assets/images/icon/area.png">
                  214m2
                </span>
                <span>
                  <img src="@/assets/images/icon/area.png">
                  214m2
                </span>
              </div>
              <div class="room-card_facilities">
                <ul>Available Facilities:
                  <li>One King Bed</li>
                  <li>One King Bed</li>
                  <li>One King Bed</li>
                  <li>One King Bed</li>
                  <li>One King Bed</li>
                </ul>
              </div>
            </div>
            <div class="room-card_butArea">
              <div class="room-card_price">
                <span class="price">$ 10.00</span>
                <span class="currency">USD</span>
              </div>
              <button class="room-card_button common-button">Add to Cart</button>
              <button class="room-card_button common-button">Book Now</button>
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
  </main>
</template>
