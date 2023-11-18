<script setup>
import { defineProps } from "vue";

defineProps({
  notes: Array,
  toggleShowNote: Function,
  deleteNote: Function,
});
</script>

<template>
  <v-card
    v-for="note in notes"
    :key="note.id"
    class="mt-6 pa-5"
    width="auto"
    rounded="xl"
    variant="outlined"
  >
    <v-card-actions>
      <v-card-title>{{ note.title }}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        :to="{ name: 'edit', params: { id: note.id } }"
        color="orange"
        rounded
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn @click="deleteNote(note.id)" color="red-accent-4" rounded>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-subtitle>Created by: {{ note.createdBy }}</v-card-subtitle>

    <v-card-subtitle>{{ note.createdDate }}</v-card-subtitle>

    <v-card-actions>
      <v-badge
        :color="
          note.category === 'study'
            ? 'pink-lighten-4'
            : note.category === 'work'
            ? 'indigo-lighten-4'
            : note.category === 'travel'
            ? 'green-lighten-3'
            : 'yellow-lighten-3'
        "
        :content="note.category"
        inline
      ></v-badge>

      <v-spacer></v-spacer>

      <v-btn
        :icon="note.isShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="toggleShowNote(note.id)"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-if="note.isShow">
        <v-divider></v-divider>

        <v-card-text>
          {{ note.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
