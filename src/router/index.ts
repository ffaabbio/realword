import { createRouter, createWebHistory } from "vue-router";
import ArticlesList from "@/views/ArticlesList.vue";
import ArticleDetail from "@/views/ArticlesDetail.vue";
import UserLogin from "@/views/UserLogin.vue";
import UserSignup from "@/views/UserSignup.vue";

const routes = [
  { path: "/", component: ArticlesList },
  { path: "/articles/:slug", component: ArticleDetail },
  { path: "/login", component: UserLogin },
  { path: "/signup", component: UserSignup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
