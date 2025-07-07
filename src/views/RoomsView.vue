<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import ToastCom from '@/components/ToastCom.vue';
import HeroCom from '@/components/HeroCom.vue';
import QuickBooking from '@/components/quickBooking.vue';
import RoomList from '@/components/RoomList.vue';

export default {
  name: 'RoomsView',
  components: {
    HeroCom,
    QuickBooking,
    RoomList,
    ToastCom
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
  <ToastCom />
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
      <!-- Room Section -->
      <div class="rooms_list">
        <RoomList :book="true" :viewOrBooking="true" />
      </div>
    </section>
  </main>
</template>
