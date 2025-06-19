<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import modalToogle from '@/stores/modalToogle';
import dashboard from '@/stores/dashboard';

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(modalToogle, ['modalToogleSet']),
    ...mapWritableState(dashboard, ['tempRoomData'])
  },
  methods: {
    ...mapActions(modalToogle, ['showModal', 'closeModal']),
    ...mapActions(dashboard, ['updateRoom', 'uploadFile']),
    // 更新房間後關閉Modal
    async submitFunc(){
      await this.updateRoom();
      this.closeModal();
    }
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
      <div class="modal-form">
        <h2 class="modal-form_title">Add New Room</h2>
        <form class="modal-form_body">

          <!-- Row 1 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Title</label>
              <input type="text" class="modal-form_input" placeholder="Enter room title" v-model="tempRoomData.title"/>
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Category</label>
              <input type="text" class="modal-form_input" placeholder="Enter category" v-model="tempRoomData.category"/>
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Unit</label>
              <input type="text" class="modal-form_input" placeholder="Enter unit"  v-model="tempRoomData.unit"/>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Image URL</label>
              <input type="text" class="modal-form_input" placeholder="Enter image URL"  v-model="tempRoomData.imageUrl"/>
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Upload Image File</label>
              <input type="file" class="modal-form_input-file" id='imageFile' @change='uploadFile'/>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Original Price</label>
              <input type="number" class="modal-form_input" placeholder="Enter original price" v-model="tempRoomData.origin_price"/>
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Sale Price</label>
              <input type="number" class="modal-form_input" placeholder="Enter sale price" v-model="tempRoomData.price" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Room Number</label>
              <input type="number" class="modal-form_input" placeholder="Enter room number" v-model="tempRoomData.num" />
            </div>
          </div>

          <!-- Description -->
          <div class="modal-form_group modal-form_group-full">
            <label class="modal-form_label">Room Description</label>
            <textarea class="modal-form_textarea" placeholder="Enter room description"  v-model="tempRoomData.description"></textarea>
          </div>

          <!-- Content -->
          <div class="modal-form_group modal-form_group-full">
            <label class="modal-form_label">Room Content</label>
            <textarea class="modal-form_textarea" placeholder="Enter room content"  v-model="tempRoomData.content"></textarea>
          </div>
        </form>
        <!-- button -->
        <div class="modal-form_group modal-form_group-button">
          <button type="submit" class="modal-form_button" @click="submitFunc">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

