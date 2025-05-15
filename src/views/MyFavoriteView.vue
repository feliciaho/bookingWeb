<script>
import { mapActions, mapState } from 'pinia';
import recipeStore from '@/stores/recipeStore';
import favoriteStore from '@/stores/favoriteStore';
import paginationStore from '@/stores/paginationStore';

export default {
  computed: {
    ...mapState(favoriteStore, ['favoriteRecipes']),
    ...mapState(recipeStore, ['recipes']),
    ...mapState(paginationStore, ['nowPageStore']),
  },
  methods: {
    ...mapActions(favoriteStore, ['addFavorite', 'removeFavorite']),
    ...mapActions(recipeStore, ['fetchApi']),
  },
};
</script>
<template>
  <section class="myFavorite" id="myFavorite">
    <h1 class="secTitle">My Favorites</h1>
    <h3 v-if="!favoriteRecipes.length">
      Add your favorite recipes to this list!
    </h3>
    <div class="homeRecipsWrap">
      <div class="homeRecipes" v-for="i in favoriteRecipes" :key="i.id + 'recipe'">
        <!-- banner -->
        <div class="banner">
          <label class="rating"><img src="../images/star.png" alt="rating" />
            {{ i.rating }}
          </label>
          <label class="remove" @click="removeFavorite(i.id)">
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
            <p>Time <span>{{ i.prepTimeMinutes + i.cookTimeMinutes }}min</span></p>
            <div class="skillWrap">
              <label v-for="tag in i.tags" :key="tag + 'tag'">#{{ tag }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
