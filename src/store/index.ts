import Vue from "vue";
import Vuex from "vuex";

// modules
import * as book from "@/store/modules/book";
import * as museum from "@/store/modules/museum";
import * as unregisteredMuseum from "@/store/modules/unregisteredMuseum"
import * as user from "@/store/modules/user";

Vue.use(Vuex);

export interface Rootstate {
  book: book.IBookState;
  museum: museum.MuseumState;
  unregisteredMuseum: unregisteredMuseum.UnregisteredMuseumState
  user: user.UserState;
}

export default new Vuex.Store<Rootstate>({
  modules: {
    book: book.store,
    museum: museum.store,
    unregisteredMuseum: unregisteredMuseum.store,
    user: user.store
  }
});
