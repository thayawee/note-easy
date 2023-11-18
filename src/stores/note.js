import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useNoteStore = defineStore("note", {
  state: () => ({
    isUpdate: false,
    notes: [],
    filter: {
      category: "all",
      dateSort: "new",
    },
    page: "",
    perPage: 3,
  }),

  actions: {
    loadNote() {
      const noteData = localStorage.getItem("note-data");

      if (noteData) {
        this.notes = JSON.parse(noteData);
      }

      if (this.filter.category !== "all") {
        this.notes = this.notes.filter((note) => {
          return note.category === this.filter.category;
        });
      }

      if (this.filter.dateSort) {
        this.notes.sort((a, b) => {
          if (this.filter.dateSort === "new") {
            return new Date(b.dateSort) - new Date(a.dateSort);
          } else {
            return new Date(a.dateSort) - new Date(b.dateSort);
          }
        });
      }
    },

    createNote(data) {
      const userStore = useUserStore();
      userStore.loadUser();
      const noteData = {
        ...data,
        createdBy: userStore.user.name,
        createdDate: new Date().toLocaleString("en-GB"),
        dateSort: new Date(),
        isShow: false,
      };
      this.notes.push(noteData);

      localStorage.setItem("note-data", JSON.stringify(this.notes));
    },

    editNote(nid, data) {
      const userStore = useUserStore();
      userStore.loadUser();
      const currentNote = {
        ...data,
        createdBy: userStore.user.name,
        createdDate: new Date().toLocaleString("en-GB"),
        dateSort: new Date(),
        isShow: false,
      };
      this.notes = this.notes.map((note) =>
        note.id === nid ? currentNote : note
      );

      localStorage.setItem("note-data", JSON.stringify(this.notes));
    },

    deleteNote(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
      localStorage.setItem("note-data", JSON.stringify(this.notes));
    },

    // ========== handler pagination ==========

    paginationNoteData(numPage) {
      const perPage = this.perPage;
      return this.notes.slice((numPage - 1) * perPage, numPage * perPage);
    },

    nextPage(numPage) {
      this.page = numPage;
    },

    prevPage(numPage) {
      this.page = numPage;
    },

    goToPage(numPage) {
      this.page = numPage;
    },
  },
});
