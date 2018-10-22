import Vue from "vue";
import Vuex from "vuex";

// modules
import * as book from "@/store/modules/book";
import * as buildJob from "@/store/modules/buildJob";
import * as pageContent from "@/store/modules/pageContent";
import * as projectTree from "@/store/modules/projectTree";
import * as user from "@/store/modules/user";
import * as buildSetting from "@/store/modules/buildSetting";

Vue.use(Vuex);

export interface Rootstate {
  book: book.IBookState;
  buildJob: buildJob.IBuildJobState;
  pageContent: pageContent.IPageContentState;
  projectTree: projectTree.IProjectTreeState;
  user: user.UserState;
  buildSetting: buildSetting.IBuildSettingState;
}

export default new Vuex.Store<Rootstate>({
  modules: {
    book: book.store,
    buildJobs: buildJob.store,
    pageContent: pageContent.store,
    projectTree: projectTree.store,
    user: user.store,
    buildSetting: buildSetting.store
  }
});
