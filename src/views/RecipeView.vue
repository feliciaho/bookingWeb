<script>
import { mapActions, mapState } from 'pinia';
import favoriteStore from '@/stores/favoriteStore';
import recipeStore from '@/stores/recipeStore';

export default {
  // 接收來自路由的 id
  props: ["id"],
  data: () => ({
    recipeId: null, // 用來存儲 recipeId
    recipesView: {}, // 用來存儲 recipe 的詳細資料
  }),
  computed: {
    ...mapState(recipeStore, ['recipes']),
    ...mapState(favoriteStore, ['favoriteRecipes']),
  },
  methods: {
    ...mapActions(recipeStore, ['fetchApi']),
    ...mapActions(favoriteStore, ['addFavorite', 'removeFavorite']),

    getRecipe() {
      const recipeInfo = recipeStore();
      const recipe = recipeInfo.recipes.find((recipe) => recipe.id == this.recipeId);
      this.recipesView = recipe;
    },
    // 檢測是否有收藏
    isFavorite(favoriteId) {
      return this.favoriteRecipes.some((item) => item && item.id == favoriteId);
    },
  },
  async mounted() {
    // 在 mounted 中將 props 的值賦給 data
    this.recipeId = this.id;
    await this.fetchApi();
    this.getRecipe();
  },
};
</script>
<template>
  <section class="recipeView">
    <div class="recipeViewWrap">
      <div class="recipeHeader">
        <label class="recipe">Recipe</label>
        <h1 class="recipeTitle">{{ recipesView.name }}</h1>
        <ul class="recipeDetails">
          <li><img src="../images/time.png">{{ recipesView.prepTimeMinutes + recipesView.cookTimeMinutes }} min</li>
          <div class="dot"></div>
          <li><img src="../images/cooking.png">{{ recipesView.difficulty }} Prep</li>
          <div class="dot"></div>
          <li><img src="../images/serves.png">{{ recipesView.servings }} serves</li>
        </ul>
      </div>
      <div class="recipeBanner">
        <label class="add" @click="addFavorite(recipeId)" v-if="!isFavorite(recipeId)">
          <img src="../images/addIcon.png" alt="add to favorite" />
        </label>
        <label class="remove" @click="removeFavorite(recipeId)" v-if="isFavorite(recipeId)">
          <img src="../images/removeIcon.png" alt="remove to favorite" />
        </label>
        <img class="recipeImg" :src="recipesView.image" :alt=recipesView.name />
      </div>
      <div class="recipeContent">
        <div class="instructionsBox">
          <h3 class="recipeContentTitle">INSTRUCTIONS</h3>
          <ul class="instructions">
            <li v-for="item in recipesView.instructions" :key="item + 'instructions'">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="ingredientsBox">
          <h3 class="recipeContentTitle">INGRIDIENTS</h3>
          <ul class="ingridients">
            <li v-for="item in recipesView.ingredients" :key="item + 'ingredient'">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
