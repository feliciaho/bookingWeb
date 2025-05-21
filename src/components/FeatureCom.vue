<script>
export default {
  name: 'FeatureCom',
  props: {
    title: String,
    subtitle: String,
    text: String,
    button: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
<template>
  <section class="feature">
    <div class="feature_image"></div>
    <div class="feature_content">
      <span class="feature_subtitle common-subtitle">{{ subtitle }}</span>
      <h2 class="feature_title common-title">{{ title }}</h2>
      <p class="feature_text common-text" v-html="text"></p>
      <button class="feature_button common-button" v-if="button">Explore</button>
    </div>
  </section>
</template>
