<script setup>
import { defineProps } from "vue";

defineProps({
  notes: Array,
  currentPage: Number,
  perPage: Number,
  nextPage: Function,
  prevPage: Function,
  goToPage: Function,
});
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="auto">
        <v-btn
          @click="prevPage"
          icon="mdi-chevron-left"
          rounded="circle"
          variant="text"
        ></v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          v-for="item in Math.ceil(notes.length / perPage)"
          :key="item"
          :active="currentPage === item"
          class="text-center text-h6 font-weight-black"
          height="60"
          rounded="circle"
          variant="text"
          @click="goToPage(item)"
        >
          {{ item }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          @click="nextPage"
          icon="mdi-chevron-right"
          rounded="circle"
          variant="text"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
