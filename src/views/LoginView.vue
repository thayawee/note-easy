<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const userStore = useUserStore();

// validate login form
const required = (val) => {
  if (val === "") {
    return "Field is required";
  }
};

const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (val) => {
  if (!pattern.test(val)) {
    return "Invalid e-mail.";
  }
};

const validatePassword = (val) => {
  if (val.length < 8) {
    return "Min 8 characters";
  }
};

// handler login
const login = () => {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  if (
    !name.value ||
    !email.value ||
    !password.value ||
    !pattern.test(email.value) ||
    password.value.length < 8
  ) {
    return;
  } else {
    userStore.login(userData);

    setTimeout(() => {
      router.push({ name: "home" });
    }, 3000);
  }
};
</script>

<template>
  <v-card
    height="auto"
    min-width="250px"
    max-width="50%"
    class="pa-10 mx-auto my-16"
    rounded="xl"
  >
    <v-alert
      v-if="userStore.isLogin"
      width="90%"
      class="mx-auto mb-10"
      rounded="xl"
      type="success"
      title="Login successful"
    ></v-alert>

    <h1 class="text-center text-uppercase mx-auto mb-10">Login</h1>

    <v-form @submit.prevent="login">
      <v-text-field
        v-model="name"
        label="Name"
        type="text"
        placeholder="test"
        :rules="[required]"
        clearable
        prepend-inner-icon="mdi-account"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="E-mail"
        type="text"
        placeholder="test@gmail.com"
        :rules="[required, validateEmail]"
        clearable
        prepend-inner-icon="mdi-email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
        :rules="[required, validatePassword]"
        clearable
        prepend-inner-icon="mdi-key"
      ></v-text-field>

      <div v-if="!userStore.isLogin" class="d-flex justify-center mt-5">
        <v-btn
          class="font-weight-black"
          color="blue-lighten-4"
          min-width="92"
          size="large"
          rounded
          variant="flat"
          type="submit"
          >Login</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>
