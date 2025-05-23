<script>
export default {
  name: 'NotFoundView',
}
</script>

<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <main class="notFound">
    <section class="notFound_text">
      <div class="common-title"> 404 Not Found </div>
    </section>
  </main>
</template>
