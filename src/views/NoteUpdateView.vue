<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNoteStore } from "../stores/note";
import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const router = useRouter();

const noteStore = useNoteStore();

const mode = ref("create");

const noteData = reactive({
  id: uuidv4(),
  category: "",
  title: "",
  description: "",
});

// validate note form
const required = (val) => {
  if (val === "") {
    return "Type something";
  }
};

// load note for update new note
onMounted(() => {
  noteStore.loadNote();

  if (route.name === "edit") {
    mode.value = "update";

    const currentNoteStore = noteStore.notes.filter(
      (note) => note.id === route.params.id
    );

    noteData.id = currentNoteStore[0].id;
    noteData.category = currentNoteStore[0].category;
    noteData.title = currentNoteStore[0].title;
    noteData.description = currentNoteStore[0].description;
  }
});

// handler create and edit note
const updateNote = () => {
  if (mode.value === "update") {
    noteStore.editNote(noteData.id, noteData);
    noteStore.isUpdate = true;
  } else {
    if (!noteData.category || !noteData.title || !noteData.description) {
      return;
    }
    noteStore.createNote(noteData);
    noteStore.isUpdate = true;
  }
  setTimeout(() => {
    noteStore.isUpdate = false;
    router.push({ name: "home" });
  }, 3000);
};

// chage text when user create or edit note
const displayText = computed(() => {
  if (mode.value === "create") {
    return "Create";
  } else {
    return "Update";
  }
});
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
      v-if="noteStore.isUpdate"
      width="90%"
      class="mx-auto mb-10"
      rounded="xl"
      type="success"
      :title="`${displayText} note successful`"
    ></v-alert>

    <h1 class="text-center text-uppercase mx-auto mb-10">
      {{ displayText }} note
    </h1>

    <v-form @submit.prevent="updateNote">
      <h3 class="mb-4 pl-2">Category:</h3>
      <v-radio-group v-model="noteData.category" inline :rules="[required]">
        <v-radio label="Study" value="study"></v-radio>
        <v-radio label="Work" value="work"></v-radio>
        <v-radio label="Travel" value="travel"></v-radio>
        <v-radio label="Other" value="other"></v-radio>
      </v-radio-group>

      <h3 class="mb-4 pl-2">Title:</h3>
      <v-text-field
        clearable
        v-model="noteData.title"
        :rules="[required]"
      ></v-text-field>

      <h3 class="mb-4 pl-2">Description:</h3>
      <v-textarea
        clearable
        v-model="noteData.description"
        clear-icon="mdi-close-circle"
        :rules="[required]"
      ></v-textarea>

      <div v-if="!noteStore.isUpdate" class="d-flex justify-center mt-5">
        <v-btn
          class="font-weight-black"
          color="blue-lighten-4"
          min-width="92"
          size="large"
          rounded
          variant="flat"
          type="submit"
          >{{ displayText }} note</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>
