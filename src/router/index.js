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
      path: '/aboutView',
      name: 'AboutView',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/exploreView',
      name: 'ExploreView',
      component: () => import('../views/ExploreView.vue'),
    },
    {
      path: '/roomsView',
      name: 'RoomsView',
      component: () => import('../views/RoomsView.vue'),
    },
    {
      path: '/cartStep1',
      name: 'CartStep1',
      component: () => import('../views/CartStep1.vue'),
    },
    {
      path: '/cartStep2',
      name: 'CartStep2',
      component: () => import('../views/CartStep2.vue'),
    },
    {
      path: '/cartStep3',
      name: 'CartStep3',
      component: () => import('../views/CartStep3.vue'),
    },
    {
      path: '/loginView',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue'),
    },
    // 新增404page 記得要在router也新增頁面
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
