<script>
import HeroCom from '@/components/HeroCom.vue';
import FeatureCom from '@/components/FeatureCom.vue';
export default {
  name: 'HomeView',
  components: {
    HeroCom,
    FeatureCom,
  },
}
</script>

<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <main class="explore">
    <!-- Hero Section -->
    <HeroCom title="Explore Homestay"
      text="Whether you’re unwinding by the pool, savoring a peaceful moment in the courtyard, or embracing the warmth of a sunlit morning in our cozy spaces, every corner is crafted to enhance relaxation and rejuvenation. Here, you can breathe in the fresh air, reconnect with nature, and experience the soothing harmony that defines true Balinese hospitality." />
    <!-- Feature Section -->
    <FeatureCom title="Swimming Pool" subtitle="Explore Our Homestay Amenities" text="Our serene outdoor pool is perfect for relaxation, whether you prefer a refreshing morning dip or a peaceful evening by the water. Surrounded by lush greenery, the pool area provides a tranquil escape from the outside world.
      <br><br>Opening Hours: 8:00 – 21:00" :button="false" />
    <FeatureCom title="Kitchen" subtitle="Explore Our Homestay Amenities"  text="Enjoy the convenience of our fully equipped kitchen, designed for both casual meals and culinary creativity. Whether you're preparing a light snack or a hearty feast, you’ll find everything you need, from modern appliances to locally inspired tableware.
      <br><br>Opening Hours: 8:00 – 22:00" :button="false" />
    <FeatureCom title="Dining & Lounge Area" subtitle="Explore Our Homestay Amenities"  text="A cozy and welcoming space designed for shared meals and relaxation. Natural light highlights the rustic wooden furniture and tropical decor, creating a warm, inviting atmosphere. Whether enjoying a meal or unwinding with a drink, this area offers the perfect blend of comfort and tranquility.
      <br><br>Opening Hours: 8:00 – 20:00" :button="false" />
  </main>
</template>
