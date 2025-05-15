<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';

export default {
  components: {
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
  <section class="home" id="home">

  </section>
</template>
