<script>
import { mapState, mapActions } from 'pinia';
import recipeStore from '@/stores/recipeStore';
import favoriteStore from '@/stores/favoriteStore';

export default {
  computed: {
    ...mapState(recipeStore, ['recipes']),
    ...mapState(favoriteStore, ['favoriteRecipes']),
    sortProducts() {
      //如果不解構會直接修改返回新的數組
      // 使用[...]解構,這樣可以避免修改原始數據。
      // 返回排序後的新數組,取前5組
      return [...this.recipes].sort((a, b) => b.rating - a.rating).slice(0, 5);
    },
  },
  methods: {
    ...mapActions(recipeStore, ['fetchApi']),
    ...mapActions(favoriteStore, ['addFavorite', 'removeFavorite']),
    isFavorite(favoriteId) {
      return this.favoriteRecipes.some((item) => item.id === favoriteId);
    },
  },
  // 這樣可以避免一開始filterData沒有資料
  mounted() {
    this.fetchApi();
  }
}
</script>
<template>
  <section class="popularRecipe" id="PopularRecipe">
    <div class="popularBanner">
      <h1>Popular Recipes</h1>
      <h3 class="popularTitle">
        Discover the most popular recipes among our users.
      </h3>
    </div>
    <!-- 提取被search pagination過濾後的nowPageStore -->
    <div class="popularRecipes" v-for="i in sortProducts" :key="i.id + 'recipe'">
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
          <h2 class="popularTitle">{{ i.name }}</h2>
          <p><img src="../images/time.png">Time <span>{{ i.prepTimeMinutes + i.cookTimeMinutes }}min</span></p>
          <div class="skillWrap">
            <label v-for="tag in i.tags" :key="tag + 'tag'">#{{ tag }}</label>
          </div>
          <p class="ingredients">
            Ingredients
            <span>
              {{ i.ingredients.join(', ') }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
