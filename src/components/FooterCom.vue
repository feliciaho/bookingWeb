<script>
export default {
  name: 'FooterCom'
}
</script>

<template>
  <footer class="footer">
    <!-- Contact Info -->
    <div class="footer_content">
      <div class="footer_contact">
        <h3 class="footer_title">Contact Us</h3>
        <ul class="footer_list">
          <li class="footer_item">
            <i class="fas fa-map-pin"></i>
            <span>Bali, Indonesia</span>
          </li>
          <li class="footer_item">
            <i class="fas fa-envelope"></i>
            <span>felicia18felicia18@gmail.com</span>
          </li>
          <li class="footer_item">
            <i class="fas fa-phone-square"></i>
            <span>( +886 ) 975925667</span>
          </li>
        </ul>
      </div>

      <!-- Map -->
      <div class="footer_map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d505145.0142019849!2d114.91356459557192!3d-8.455072407639544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd141d3e8100fa1%3A0x24910fb14b24e690!2sBali%2C%20Indonesia!5e0!3m2!1sen!2stw!4v1710240086010!5m2!1sen!2stw"
          width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer_bottom">
      <p class="footer_copyright">© 2025 Felicia Ho's Homestay, Inc.<br>All rights reserved.</p>
    </div>
  </footer>
</template>
