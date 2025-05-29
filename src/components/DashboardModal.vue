<script>
import { mapActions, mapState } from 'pinia';
import modalToogle from '@/stores/modalToogle';
export default {
  data: () => ({

  }),
  computed: {
    ...mapState(modalToogle, ['modalToogleSet'])
  },
  methods: {
    ...mapActions(modalToogle, ['showModal', 'closeModal'])
  },
}
</script>

<template>
  <div class="modal" v-if="modalToogleSet == true">
    <!-- overlay -->
    <div class="modal-overlay" @click="closeModal"></div>
    <!-- modal -->
    <div class="modal-area">
      <button class="modal-close" @click="closeModal">x</button>
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </div>
</template>
