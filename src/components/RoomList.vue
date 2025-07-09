<script>
import { mapState, mapActions, mapWritableState } from 'pinia';
import { Pagination } from 'swiper/modules'
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import roomsView from '@/stores/roomsView';
import bookingStore from '@/stores/bookingStore';
import toast from '@/stores/toastStore';

export default {
  name: 'RoomListCard',
  components: {
    Flatpickr,
  },

  props: {
    book: {
      type: Boolean,
      default: false,
    },
    viewOrBooking: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    dateOptions: {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      enableTime: false,
    },
    validDateSet: true,
    swiperModules: [Pagination]
  }),
  computed: {
    ...mapState(roomsView, ['roomData']),
    ...mapWritableState(bookingStore, ['BookingData', 'checkIn', 'checkOut']),
    // 計算入住天數
    stayNights() {
      if (this.checkIn && this.checkOut) {
        //  new Date()格式 Thu Jun 26 2025 08:00:00 GMT+0800 (GMT+08:00)
        const inDate = new Date(this.checkIn);
        const outDate = new Date(this.checkOut);
        // new Date()會回傳毫秒數 所以要用除以1000(毫秒)*60(秒)*60(分)*24(小時)轉成天數
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff
      }
      return null; // 如果沒有選擇日期則回傳0
    },
  },
  methods: {
    ...mapActions(roomsView, ['getRoomsData']),
    ...mapActions(bookingStore, ['addBooking', 'getBooking', 'removeBooking', 'updateBooking']),
    ...mapActions(toast, ['toastFailed']),
    // 驗證日期入住日不能大於退房日
    validDate() {
      if (this.checkIn && this.checkOut && new Date(this.checkIn) >= new Date(this.checkOut)) {
        // 如果入住日大於或等於退房日，則清空日期
        this.checkIn = null
        this.checkOut = null
        // 設定validDateSet為false
        this.validDateSet = false;
      } else {
        // 如果日期有效，則設定validDateSet為true
        this.validDateSet = true;
      }
    },
    // 預訂房間
    async bookRoom(roomId, stayNights) {
      try {
        //如果沒有選擇日期則return
        if (!this.checkIn || !this.checkOut || !this.validDateSet) {
          this.toastFailed('Error Date', 'Please check dates.');
          return;
        }
        // 呼叫addBooking方法，傳入房間ID和入住天數
        await this.addBooking(roomId, stayNights);
        // 成功後導向到購物車步驟1
        this.$router.push('/booking/stepView1');
      } catch (error) {
        console.error('Error booking room', error);
        this.toastFailed('Error booking room', "");
        return;
      }
    },
    // 更新房間資訊
    async updateRoom(roomId) {
      try {
        const nights = this.stayNights;
        //如果沒有選擇日期則return
        if (!this.checkIn || !this.checkOut || !this.validDateSet) {
          this.toastFailed('Error Date', 'Please check dates.');
          return;
        }
        // 呼叫addBooking方法，傳入房間ID和入住天數
        await this.updateBooking(roomId, nights);
        // 成功後導向到購物車步驟1
      } catch (error) {
        console.error('Error booking room', error);
        this.toastFailed('Error booking room', "");
        return;
      }
    },
  },
  // 監聽日期變化
  watch: {
    // 當checkIn或checkOut變化時，呼叫validDate方法
    checkIn: 'validDate',
    checkOut: 'validDate',
  },
  created() {
    // 如果在roomView的頁面才會一開始就取得roomsData
    if (this.viewOrBooking === true) {
      this.getRoomsData();
    }
  },
}
</script>
<template>
  <!-- 判斷是在roomsView還是在bookingStep1 -->
  <div class="room-card" v-for="(room, index) in this.viewOrBooking ? roomData : BookingData" :key="index">
    <AppSwiper class="room-card_swiper" :pagination="true" :modules="swiperModules">
      <SwiperSlide v-for="(img, index) in this.viewOrBooking ? room.imagesUrl : room.product.imagesUrl"
        :key="index + 'image'">
        <img :src="img" class="room-card_image" />
      </SwiperSlide>
    </AppSwiper>
    <div class="room-card_content">
      <div class="room-card_text">
        <h3 class="room-card_title">{{ this.viewOrBooking ? room.title : room.product.title }}</h3>
        <p class="room-card_description">{{ this.viewOrBooking ? room.description : room.product.description }}</p>
        <div class="room-card_info">
          <span>
            <img src="@/assets/images/icon/bed.png">
            {{ viewOrBooking ? room.category / 2 : room.product.category / 2 }} Bed{{ (viewOrBooking ? room.category :
              room.product.category) > 2 ? 's' : '' }}
          </span>
          <span>
            <img src="@/assets/images/icon/guest.png">
            {{ this.viewOrBooking ? room.category : room.product.category }} guests(maximum)
          </span>
          <span>
            <img src="@/assets/images/icon/area.png">
            {{ this.viewOrBooking ? room.unit : room.product.unit }}
          </span>
          <span>
            <img src="@/assets/images/icon/shower.png">
            1 bathroom
          </span>
        </div>
        <div class="room-card_facilities">Available Facilities:
          <!-- 用split將回傳的字串轉成陣列 -->
          <ul>
            <li v-for="(facility, index) in this.viewOrBooking ? room.content.split(',') : room.product.content.split(',')"
              :key="index + 'facilities'">{{ facility }}</li>
          </ul>
        </div>
        <div class="quick-booking_form-room" v-if="!viewOrBooking">
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check in</label>
            <Flatpickr v-model="this.checkIn" :config="dateOptions" placeholder="Select date"
              @change="updateRoom(room.id)"></Flatpickr>
          </div>
          <div class="quick-booking_group">
            <label><img src="@/assets/images/icon/date.png">Check Out</label>
            <Flatpickr v-model="this.checkOut" :config="dateOptions" placeholder="Select date"
              @change="updateRoom(room.id)"></Flatpickr>
          </div>
        </div>
      </div>
      <div class="room-card_butArea">
        <div class="room-card_price">
          <div class="room-card_price-night">
            <span class="price">${{ this.viewOrBooking ? room.origin_price : room.product.origin_price }}.00</span>
            <span class="currency"> USD</span>
          </div>
          <span class="currency">price/per night</span>
        </div>
        <div class="room-card_button">
          <!-- addBooking 帶入房間id跟stayNights計算過後的天數 -->
          <button class="room-card_button-add common-button" @click="bookRoom(room.id, stayNights)" v-if="book">Book
            Now</button>
        </div>
      </div>
    </div>
  </div>
</template>
