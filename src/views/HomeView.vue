<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import HeroCom from '@/components/HeroCom.vue';
import QuickBooking from '@/components/quickBooking.vue';
import FeatureCom from '@/components/FeatureCom.vue';
import RoomCard from '@/components/RoomCard.vue';
import ToastCom from '@/components/ToastCom.vue';


export default {
  name: 'HomeView',
  components: {
    HeroCom,
    QuickBooking,
    FeatureCom,
    RoomCard,
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
  <main class="home">
    <!-- Hero Section -->
    <HeroCom title="Discover the Enchanting Bali Retreat"
      text="Immerse yourself in the serene ambiance of our Bali-inspired retreat, where natural textures, tropical elements, and a focus on simplicity and elegance create an unparalleled experience" />
    <!-- Quick Booking Section -->
    <QuickBooking />
    <!-- Feature Section -->
    <FeatureCom title="Discover Unmatched Luxury" subtitle="Embrace the Bali Lifestyle" text="Elevate your getaway with our Bali-inspired resort, where every detail is carefully
          curated to provide an unparalleled experience. Immerse yourself in the tranquility of our secluded haven,
          surrounded by lush greenery, natural textures, and the gentle whispers of the ocean" :button="true" />
    <!-- Rooms Section -->
    <RoomCard />
  </main>
</template>
