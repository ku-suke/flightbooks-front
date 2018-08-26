import Vue from "vue";
import Vuex from "vuex";

// modules
import * as book from "@/store/modules/book";
import * as user from "@/store/modules/user";

Vue.use(Vuex);

export interface Rootstate {
  book: book.IBookState;
  user: user.UserState;
}

export default new Vuex.Store<Rootstate>({
  modules: {
    book: book.store,
    user: user.store
  }
});
