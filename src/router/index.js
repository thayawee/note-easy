import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NoteUpdateView from "../views/NoteUpdateView.vue";

import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/create",
      name: "create",
      component: NoteUpdateView,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: NoteUpdateView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.loadUser();

  console.log("from", from.name);
  console.log("to", to.name);

  if (to.name === "create" && !userStore.isLogin) {
    next({ name: "login" });
  } else if (to.name === "edit" && !userStore.isLogin) {
    next({ name: "login" });
  } else if (to.name === "login" && userStore.isLogin) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
