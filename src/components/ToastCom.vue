<script>
import { mapState } from 'pinia'
import dashboard from '@/stores/dashboard'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(dashboard, ['toastToogleSet', 'toastTitle', 'toastContent', 'toastSuccess']),
  },
  methods: {
  },
}
</script>

<template>
  <div class="toast-message" v-if="this.toastToogleSet">
    <div class="toast-message_icon-success" v-if="this.toastSuccess">
      <img src="../assets/images/icon/check.png">
    </div>
    <div class="toast-message_icon-fail" v-if="!this.toastSuccess">
      <img src="../assets/images/icon/remove.png">
    </div>
    <div class="toast-message_title">
      {{ this.toastTitle }}
    </div>
    <div class="toast-message_content">
      {{ this.toastContent }}
    </div>
  </div>
</template>
