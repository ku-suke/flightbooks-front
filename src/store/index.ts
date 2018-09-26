import Vue from "vue";
import Vuex from "vuex";

// modules
import * as book from "@/store/modules/book";
import * as buildJob from "@/store/modules/buildJob";
import * as pageContent from "@/store/modules/pageContent";
import * as projectTree from "@/store/modules/projectTree";
import * as user from "@/store/modules/user";

Vue.use(Vuex);

export interface Rootstate {
  book: book.IBookState;
  buildJob: buildJob.IBuildJobState;
  pageContent: pageContent.IPageContentState;
  projectTree: projectTree.IProjectTreeState;
  user: user.UserState;
}

export default new Vuex.Store<Rootstate>({
  modules: {
    book: book.store,
    buildJobs: buildJob.store,
    pageContent: pageContent.store,
    projectTree: projectTree.store,
    user: user.store
  }
});
