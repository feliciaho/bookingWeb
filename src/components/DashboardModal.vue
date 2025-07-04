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
    ...mapWritableState(dashboard, ['tempRoom', 'tabToggle', 'orderDetailsData'])
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
    <!-- room modal -->
    <div class="modal-areaR" v-if="tabToggle === 'room'">
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
              <input type="text" class="modal-form_input" placeholder="Enter category" v-model="tempRoom.category" />
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
                :false-value="0" id="is_enabled" />
              <label class="modal-form_label" for="is_enabled">
                able to book
              </label>
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Image URL</label>
              <input type="text" class="modal-form_input" placeholder="Enter image URL" v-model="tempRoom.imageUrl" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Upload Image File</label>
              <input type="file" class="modal-form_input-file" id='imageFile' @change='uploadFile' />
            </div>
          </div>

          <!-- Row 3 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Images URL</label>
              <template v-for="(img, index) in tempRoom.imagesUrl" :key="index">
                <input type="text" class="modal-form_input" placeholder="Enter image URL"
                  v-model="tempRoom.imagesUrl[index]" />
              </template>
              <!-- <input type="text" class="modal-form_input" placeholder="Enter image URL"
                v-model="tempRoom.imagesUrl" /> -->
              <!-- <input type="text" class="modal-form_input" placeholder="Enter image URL"
                v-model="tempRoom.imagesUrl[1]" /> -->
            </div>
          </div>

          <!-- Row 4 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Original Price</label>
              <input type="number" class="modal-form_input" placeholder="Enter original price"
                v-model="tempRoom.origin_price" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Sale Price</label>
              <input type="number" class="modal-form_input" placeholder="Enter sale price" v-model="tempRoom.price" />
            </div>
            <div class="modal-form_group">
              <label class="modal-form_label">Room Number</label>
              <input type="number" class="modal-form_input" placeholder="Enter room number" v-model="tempRoom.num" />
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
    <!-- order modal -->
    <div class="modal-areaO" v-if="tabToggle === 'order'">
      <button class="modal-close" @click="closeModal">x</button>
      <div class="modal-form">
        <h2 class="modal-form_title">Oder Details</h2>
        <form class="modal-form_body">
          <!-- Row 1 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Customer</label>
              <div class="modal-form_wrap">
                <div class="modal-form_text">Name: {{ orderDetailsData.user.name }}</div>
                <div class="modal-form_text">Email: {{ orderDetailsData.user.email }}</div>
                <div class="modal-form_text">Tel: {{ orderDetailsData.user.tel }}</div>
              </div>
            </div>
          </div>
          <!-- Row 2 -->
          <div class="modal-form_row">
            <div class="modal-form_group">
              <label class="modal-form_label">Order</label>
              <div class="modal-form_wrap" v-for="order in orderDetailsData.products" :key="order.id">
                <div class="modal-form_text">Room Title: {{ order.product.title }}</div>
                <div class="modal-form_text">Booking Date: {{ orderDetailsData.user.address }}</div>
                <div class="modal-form_text">Stay Nights: {{ order.qty }} nights</div>
                <div class="modal-form_text">Room Guests: {{ order.product.category }} guests(maximum)</div>
                <div class="modal-form_text">Total Price: ${{ order.final_total }}.00 USD</div>
                <div class="modal-form_text" v-if="orderDetailsData.message">Message: {{ orderDetailsData.message }}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
