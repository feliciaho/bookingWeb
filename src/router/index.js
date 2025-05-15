import { createRouter, createWebHashHistory } from 'vue-router'
//createWebHistoty改成createWebHashHistor----改成hash模式
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //改成linkActiveClass active
  linkActiveClass: 'active',
  routes: [
    //預設是homeView
    { path: '/', redirect: '/homeView' },
    {
      path: '/homeView',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/popularView',
      name: 'PopularView',
      component: () => import('../views/PopularView.vue'),
    },
    {
      path: '/myFavoriteView',
      name: 'MyFavoriteView',
      component: () => import('../views/MyFavoriteView.vue'),
    },
    {
      path: '/recipeView/:id',
      name: 'RecipeView',
      component: () => import('../views/RecipeView.vue'),
      // 將路由參數 id 傳遞為 props
      props: (route) =>({
        id: route.params.id
      })
    },
    //新增404page 記得要在router也新增頁面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  // 每換一次路由就回到最上面
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
