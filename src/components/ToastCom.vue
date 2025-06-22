<script>
import { mapState } from 'pinia'
import toastStore from '@/stores/toastStore'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(toastStore, ['toastTitle', 'toastContent', 'toastSuccess', 'toastToggleSet']),
  },
}
</script>

<template>
  <div class="toast-message" v-if="this.toastToggleSet">
    <div class="toast-message_icon-success" v-if="this.toastSuccessSet">
      <img src="../assets/images/icon/check.png">
    </div>
    <div class="toast-message_icon-fail" v-if="!this.toastSuccessSet">
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
