<script setup>
import { onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import { useNoteStore } from "./stores/note";
import { useThemeStore } from "./stores/theme";

const router = useRouter();

const userStore = useUserStore();
const noteStore = useNoteStore();
const themeStore = useThemeStore();

onMounted(() => {
  userStore.loadUser();
  noteStore.loadNote();
  themeStore.loadTheme();
});

const logout = () => {
  localStorage.removeItem("user-data");
  localStorage.removeItem("note-data");
  userStore.isLogin = false;
  window.location = "/";
};
</script>

<template>
  <v-app :theme="themeStore.theme">
    <v-app-bar class="px-10 py-2">
      <v-btn :to="{ name: 'home' }" rounded>
        <v-icon
          class="pr-2"
          :color="themeStore.theme === 'dark' ? 'white' : 'black'"
          size="30"
          >mdi-note-text-outline</v-icon
        >
        <v-app-bar-title
          class="font-weight-black"
          :class="themeStore.theme === 'dark' ? 'text-white' : 'text-black'"
          >Note Easy</v-app-bar-title
        >
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="
          themeStore.theme === 'dark'
            ? 'mdi-weather-night'
            : 'mdi-white-balance-sunny'
        "
        size="small"
        @click="themeStore.toggleTheme"
      ></v-btn>

      <v-btn
        v-if="!userStore.isLogin"
        :to="{ name: 'login' }"
        class="font-weight-black"
        color="blue-lighten-4"
        rounded
        variant="flat"
        >Login</v-btn
      >

      <v-btn v-else @click="logout" class="font-weight-black" rounded
        >Logout</v-btn
      >
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
