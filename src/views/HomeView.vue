<script>
import { mapActions, mapState } from 'pinia';
import recipeStore from '@/stores/recipeStore';
import filterStore from '@/stores/filterStore';
import loadingStore from '@/stores/loadingStore';
import favoriteStore from '@/stores/favoriteStore';
import paginationStore from '@/stores/paginationStore';
import PaginationCom from '@/components/PaginationCom.vue';
import AboutUsCom from '@/components/AboutUsCom.vue';

export default {
  components: {
    PaginationCom,
    AboutUsCom,
  },
  computed: {
    ...mapState(loadingStore, ['isloading']),
    ...mapState(paginationStore, ['nowPageStore']),
    ...mapState(favoriteStore, ['favoriteRecipes']),
  },
  methods: {
    ...mapActions(recipeStore, ['fetchApi']),
    ...mapActions(filterStore, ['filterData']),
    ...mapActions(loadingStore, ['startLoading', 'stopLoading']),
    ...mapActions(favoriteStore, ['addFavorite', 'removeFavorite']),
    // 檢測是否有收藏
    isFavorite(favoriteId) {
      return this.favoriteRecipes.some((item) => item.id === favoriteId);
    },
  },
  // 取得api資料後才執行filterData
  // 這樣可以避免一開始filterData沒有資料
  async mounted() {
    this.startLoading();
    await this.fetchApi();
    this.filterData();
    this.stopLoading();
  },
}
</script>
<template>
  <LoadingOverlay :active="isloading"></LoadingOverlay>
  <section class="home" id="home">
    <AboutUsCom></AboutUsCom>
    <h1 id="homeWrap">Explore Recipes</h1>
    <h3 v-if="!nowPageStore.length">
      Not Found
    </h3>
    <!-- 提取被search pagination過濾後的nowPageStore -->
    <div class="homeRecipsWrap">
      <div class="homeRecipes" v-for="i in nowPageStore" :key="i.id + 'recipe'">
        <!-- banner -->
        <div class="banner">
          <label class="rating"><img src="../images/star.png" alt="rating" />
            {{ i.rating }}
          </label>
          <!-- 抓取id當入參數回傳給isFavorite查看是否有收藏 -->
          <label class="add" @click="addFavorite(i.id)" v-if="!isFavorite(i.id)">
            <img src="../images/addIcon.png" alt="add to favorite" />
          </label>
          <label class="remove" @click="removeFavorite(i.id)" v-if="isFavorite(i.id)">
            <img src="../images/removeIcon.png" alt="remove to favorite" />
          </label>
          <RouterLink :to="'/recipeView/' + i.id">
            <img :src="i.image">
          </RouterLink>
          <div class="mask">
            <label class="seemore">See more</label>
          </div>
        </div>
        <!-- text -->
        <div class="secText">
          <div>
            <h2 class="homeRecipesTitle">{{ i.name }}</h2>
            <p><img src="../images/time.png">Time <span>{{ i.prepTimeMinutes + i.cookTimeMinutes }}min</span></p>
            <div class="skillWrap">
              <label v-for="tag in i.tags" :key="tag + 'tag'">#{{ tag }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationCom></PaginationCom>
  </section>
</template>
