<script>
export default {
  name: 'NotFoundView',
}
</script>

<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <main class="notFound">
    <div class="common-title"> 404 Not Found </div>
  </main>
</template>
