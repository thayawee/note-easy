<script setup>
import { ref, onMounted, computed } from "vue";
import { useNoteStore } from "../stores/note";
import NoteList from "../components/NoteList.vue";
import Pagination from "../components/Pagination.vue";

const page = ref(1);

const noteStore = useNoteStore();

// load note when created new note
onMounted(() => {
  noteStore.loadNote();
});

// show note description
const toggleShowNote = (noteId) => {
  return noteStore.notes.filter((note) =>
    note.id === noteId ? (note.isShow = !note.isShow) : note.isShow
  );
};

// fiter note by category
const filterNoteCategory = (val) => {
  noteStore.filter.category = val;
  noteStore.loadNote();
  page.value = 1;
  console.log(noteStore.filter.category);
};

// sort note by date
const sortNoteDate = (val) => {
  noteStore.filter.dateSort = val;
  console.log(val);
  noteStore.loadNote();
};

// data note 3 items in page
const paginationNoteData = computed(() => {
  return noteStore.paginationNoteData(page.value);
});

// onClick nextPage current + 1
const nextPage = () => {
  if (page.value !== Math.ceil(noteStore.notes.length / noteStore.perPage)) {
    page.value += 1;
  }
  noteStore.nextPage(page.value);
};

// onClick prevPage current - 1
const prevPage = () => {
  if (page.value !== 1) {
    page.value -= 1;
  }
  noteStore.prevPage(page.value);
};

// onClick numPage go to number page
const goToPage = (numPage) => {
  page.value = parseInt(numPage);
  console.log(numPage);
  noteStore.goToPage(page.value);
};

// delete note by id
const deleteNote = (noteId) => {
  noteStore.deleteNote(noteId);
};
</script>

<template>
  <v-container>
    <h1 class="text-center text-uppercase mx-auto my-10">My note</h1>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          class="font-weight-black"
          min-width="92"
          rounded
          variant="outlined"
          :active="noteStore.filter.category === 'all'"
          @click="filterNoteCategory('all')"
        >
          All
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          class="font-weight-black"
          min-width="92"
          rounded
          variant="outlined"
          :active="noteStore.filter.category === 'study'"
          @click="filterNoteCategory('study')"
        >
          Study
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          class="font-weight-black"
          min-width="92"
          rounded
          variant="outlined"
          :active="noteStore.filter.category === 'work'"
          @click="filterNoteCategory('work')"
        >
          Work
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          class="font-weight-black"
          min-width="92"
          rounded
          variant="outlined"
          :active="noteStore.filter.category === 'travel'"
          @click="filterNoteCategory('travel')"
        >
          Travel
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          class="font-weight-black"
          min-width="92"
          rounded
          variant="outlined"
          :active="noteStore.filter.category === 'other'"
          @click="filterNoteCategory('other')"
        >
          Other
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div class="d-flex justify-center mt-6 mb-10">
    <v-btn
      :to="{ name: 'create' }"
      class="font-weight-black"
      color="blue-lighten-4"
      rounded
      variant="flat"
      >Create note</v-btn
    >
  </div>

  <div
    v-if="noteStore.notes.length > 0"
    class="d-flex justify-center align-center mt-6"
  >
    <v-card width="75%" height="130" class="rounded-t-xl py-7" size="small">
      <div class="d-flex justify-center">
        <v-btn
          class="font-weight-black rounded-s-xl"
          min-width="92"
          variant="outlined"
          :active="noteStore.filter.dateSort === 'new'"
          @click="sortNoteDate('new')"
        >
          New
        </v-btn>

        <v-btn
          class="font-weight-black rounded-e-xl"
          min-width="92"
          variant="outlined"
          :active="noteStore.filter.dateSort === 'old'"
          @click="sortNoteDate('old')"
        >
          Old
        </v-btn>
      </div>

      <h4 class="text-center mt-5">
        {{ noteStore.notes.length }}
        {{ noteStore.notes.length > 1 ? "Notes" : "Note" }}
      </h4>
    </v-card>
  </div>

  <v-card
    max-height="50%"
    width="75%"
    class="pa-14 mx-auto mb-10 overflow-auto rounded-b-xl"
  >
    <h4 v-if="noteStore.notes.length <= 0" class="text-center mt-5">
      - Let's create your note -
      <div>
        <v-icon class="mt-10" size="200" color="grey-lighten-2"
          >mdi-file-document-edit-outline</v-icon
        >
      </div>
    </h4>

    <div v-else>
      <NoteList
        :notes="paginationNoteData"
        :toggleShowNote="toggleShowNote"
        :deleteNote="deleteNote"
      ></NoteList>
    </div>
  </v-card>

  <div v-if="noteStore.notes.length > 0">
    <Pagination
      :notes="noteStore.notes"
      :currentPage="page"
      :perPage="noteStore.perPage"
      :nextPage="nextPage"
      :prevPage="prevPage"
      :goToPage="goToPage"
    ></Pagination>
  </div>
</template>
