<template>
  <div class="BookNavi">
    <div class="BookNavi__Navi">
      <router-link :to="{ name: 'buildSetting', params: { id: presenter.projectTree.props.identifier }}">
        <NavItem label="書籍をビルド">
          <i class="el-icon-printer" slot="icon" />
        </NavItem>
      </router-link>
      <Nav label="設定">
        <NavItem label="プロジェクト設定" />
        <NavItem label="出版設定" />
      </Nav>
      <Nav label="チャプター管理">
        <div slot="menu">
          <ProjectTreeMenu v-if="presenter.projectTree.props.identifier" @addChapter="registerChapter" @registerPage="registerPage" :identifier="presenter.projectTree.props.identifier" />
        </div>
        <ChapterTree v-for="chapter in presenter.projectTree.chapters" :nestLevel="1" :data="chapter" :key="chapter.props.identifier" :currentPage="presenter.currentPage" @addChapter="registerChapter" @registerPage="registerPage" @onPageClick="selectPage"/>
        <PageTree v-for="page in presenter.projectTree.pages" :nestLevel="1" :data="page" :key="page.props.identifier" :currentPage="presenter.currentPage" @onPageClick="selectPage" />
      </Nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BookEntity from "@/entities/Book";
import PageEntity from "@/entities/Page";

import Presenter, { IPresenter } from "./presenter";
import ErrorService from "@/services/ErrorService";

// Use Case
import FetchProjectTreeUseCase from "@/usecases/projectTree/FetchProjectTreeUseCase";
import RegisterChapterUseCase from "@/usecases/RegisterChapterUseCase";
import RegisterPageUseCase from "@/usecases/RegisterPageUseCase";
import SelectPageUseCase from "@/usecases/SelectPageUseCase";

// Repositories
import PageContentRepository from "@/repositories/PageContentRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import BuildJobRepository from "@/repositories/BuildJobRepository";
import UserRepository from "@/repositories/UserRepository";

// Components
import Nav from "@/components/Base/Nav.vue";
import NavItem from "@/components/Base/NavItem.vue";
import ProjectTreeMenu from "@/components/Modules/ProjectTreeMenu.vue";
import ChapterTree from "@/components/Modules/Tree/ChapterTree.vue";
import PageTree from "@/components/Modules/Tree/PageTree.vue";

export default Vue.extend({
  components: {
    Nav,
    NavItem,
    ProjectTreeMenu,
    ChapterTree,
    PageTree
  },
  props: {
    book: {
      type: Object as () => BookEntity
    }
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        userRepository: new UserRepository(),
        projectTreeRepository: new ProjectTreeRepository(),
        pageContentRepository: new PageContentRepository()
      });
    }
  },
  methods: {
    async fetch() {
      const usecase = new FetchProjectTreeUseCase({
        projectTreeRepository: new ProjectTreeRepository(),
        ref: this.book.props.projectTreeRef,
        errorService: new ErrorService({ context: "Fetching projectTree" })
      });

      await usecase.execute();
    },
    async registerChapter({
      name,
      parentId
    }: {
      name: string;
      parentId: string;
    }) {
      const usecase = new RegisterChapterUseCase({
        projectTreeEntity: this.presenter.projectTree,
        projectTreeRepository: new ProjectTreeRepository(),
        errorService: new ErrorService({ context: "Registering chapter" })
      });

      await usecase.execute({ name, parentId });
    },
    async registerPage({ name, parentId }: { name: string; parentId: string }) {
      const usecase = new RegisterPageUseCase({
        projectTreeEntity: this.presenter.projectTree,
        pageContentRepository: new PageContentRepository(),
        projectTreeRepository: new ProjectTreeRepository(),
        errorService: new ErrorService({ context: "Registering page" })
      });

      await usecase.execute({ name, parentId });
    },
    async selectPage(pageEntity: PageEntity) {
      const usecase = new SelectPageUseCase({
        pagecontentRepository: new PageContentRepository(),
        errorService: new ErrorService({ context: "Selecting Page" })
      });

      await usecase.execute(pageEntity);
    }
    // async build() {
    //   const usecase = new CreateBuildJobUseCase({
    //     buildJobRepository: new BuildJobRepository(),
    //     errorService: new ErrorService({ context: "CreateBuildJob UseCase" })
    //   });

    //   await usecase.execute({
    //     owner: this.presenter.userId,
    //     bookId: this.book.props.identifier,
    //     projectTreeEntity: this.presenter.projectTree
    //   });
    // }
  },
  watch: {
    book: {
      async handler(val: BookEntity) {
        if (!val) return;
        await this.fetch();
      }
    }
  }
});
</script>


<style scoped>
.BookNavi {
  height: 100%;
  width: 100%;
  background-color: #2e3235;
}
</style>
