import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "dark",
  }),

  actions: {
    loadTheme() {
      const currentTheme = localStorage.getItem("theme");
      this.theme = JSON.parse(currentTheme);
    },

    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", JSON.stringify(this.theme));
    },
  },
});
