# Options API
<script>
export default {
  name: 'HeroCom',
  props: {
    title:String,
    text: String,
  },
}
</script>

<template>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero_content">
      <h1 class="hero_title common-title">{{ title }}</h1>
      <p class="hero_text common-text">{{ text }}</p>
    </div>
  </section>
</template>
