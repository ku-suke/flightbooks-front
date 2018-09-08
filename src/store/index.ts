import Vue from "vue";
import Vuex from "vuex";

// modules
import * as book from "@/store/modules/book";
import * as chapter from "@/store/modules/chapter";
import * as user from "@/store/modules/user";

Vue.use(Vuex);

export interface Rootstate {
  book: book.IBookState;
  chapter: chapter.IChapterState;
  user: user.UserState;
}

export default new Vuex.Store<Rootstate>({
  modules: {
    book: book.store,
    chapter: chapter.store,
    user: user.store
  }
});
