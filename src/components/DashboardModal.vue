<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import modalToggle from '@/stores/modalToggle';
import dashboard from '@/stores/dashboard';
import loadingStore from '@/stores/loadingStore';

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(loadingStore, ['isloading']),
    ...mapState(modalToggle, ['modalToggleSet']),
    ...mapWritableState(dashboard, ['tempRoom'])
  },
  methods: {
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(modalToggle, ['showModal', 'closeModal']),
    ...mapActions(dashboard, ['updateRoom', 'uploadFile']),
  },
}
</script>

<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <div class="modal" v-if="modalToggleSet == true">
    <!-- overlay -->
    <div class="modal-overlay"></div>
    <!-- modal -->
    <div class="modal-area">
      <button class="modal-close" @click="closeModal">x</button>
      <div class="modal-form">
        <h2 class="modal-form_title">Add New Room</h2>
        <form class="modal-form_body">

          <!-- Row 1 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Title</label>
              <input type="text" class="modal-form_input" placeholder="Enter room title" v-model="tempRoom.title" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Category</label>
              <input type="text" class="modal-form_input" placeholder="Enter category"
                v-model="tempRoom.category" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Unit</label>
              <input type="text" class="modal-form_input" placeholder="Enter unit" v-model="tempRoom.unit" />
            </div>
          </div>

          <!-- Row 2 -->
          <div class="modal-form_row">
            <div class="modal-form_group-checkbox">
              <input class="modal-form_label" type="checkbox" v-model="tempRoom.is_enabled" :true-value="1"
                :false-value="0" id="is_enabled"/>
              <label class="modal-form_label" for="is_enabled">
                able to book
              </label>
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Image URL</label>
              <input type="text" class="modal-form_input" placeholder="Enter image URL"
                v-model="tempRoom.imageUrl" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Upload Image File</label>
              <input type="file" class="modal-form_input-file" id='imageFile' @change='uploadFile' />
            </div>
          </div>

          <!-- Row 3 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Original Price</label>
              <input type="number" class="modal-form_input" placeholder="Enter original price"
                v-model="tempRoom.origin_price" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Sale Price</label>
              <input type="number" class="modal-form_input" placeholder="Enter sale price"
                v-model="tempRoom.price" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Room Number</label>
              <input type="number" class="modal-form_input" placeholder="Enter room number"
                v-model="tempRoom.num" />
            </div>
          </div>

          <!-- Description -->
          <div class="modal-form_group modal-form_group-full">
            <label class="modal-form_label">Room Description</label>
            <textarea class="modal-form_textarea" placeholder="Enter room description"
              v-model="tempRoom.description"></textarea>
          </div>

          <!-- Content -->
          <div class="modal-form_group modal-form_group-full">
            <label class="modal-form_label">Room Content</label>
            <textarea class="modal-form_textarea" placeholder="Enter room content"
              v-model="tempRoom.content"></textarea>
          </div>
        </form>
        <!-- button -->
        <div class="modal-form_group modal-form_group-button">
          <button type="submit" class="modal-form_button" @click="updateRoom">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
