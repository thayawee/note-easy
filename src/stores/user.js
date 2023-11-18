import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLogin: false,
    user: {},
  }),

  actions: {
    loadUser() {
      const userData = localStorage.getItem("user-data");
      if (userData) {
        this.user = JSON.parse(userData);
        this.isLogin = true;
      }
    },

    login(userData) {
      this.isLogin = true;
      localStorage.setItem("user-data", JSON.stringify(userData));
    },
  },
});
