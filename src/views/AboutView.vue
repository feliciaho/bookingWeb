<script>
import HeroCom from '@/components/HeroCom.vue';
import FeatureCom from '@/components/FeatureCom.vue';
export default {
  name: 'AboutView',
  components: {
    HeroCom,
    FeatureCom,
  },
}
</script>

<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <main class="about">
    <!-- Hero Section -->
    <HeroCom
      title="About Us"
      text="Surrounded by lush gardens and calming landscapes, our homestay invites you to relax in thoughtfully crafted spaces. Our team is dedicated to providing you with the best experience, ensuring comfort, tranquility, and a true escape into nature. We look forward to welcoming you"
    />
    <!-- Feature Section -->
     <FeatureCom
      title="Welcome to Felicia Ho's Homestay"
      subtitle="About me and Homestay"
      text="I am an Indonesian Chinese who speaks Mandarin, English, and Indonesian fluently, ensuring a warm and welcoming experience for guests from diverse backgrounds.
          Here, you will immerse yourself in a Bali-inspired retreat, where every detail is thoughtfully designed for an unparalleled relaxation experience. Enjoy the serenity of lush greenery, natural textures, and the soothing whispers of ocean waves."
      :button="flase"
     />
  </main>
</template>
