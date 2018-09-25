<template>
  <div class="BookNavi">
    <div class="BookNavi__Navi">
      <Nav label="設定">
        <NavItem label="プロジェクト設定" />
        <NavItem label="出版設定" />
        <Nav label="設定">
          <NavItem label="プロジェクト設定" />
          <NavItem label="出版設定" />
          <Nav label="設定">
            <div slot="menu">
            </div>
            <NavItem label="プロジェクト設定" />
            <NavItem label="出版設定" />
          </Nav>
        </Nav>
      </Nav>
      <Nav label="チャプター管理">
        <div slot="menu">
          <ProjectTreeMenu v-if="presenter.projectTree.props.identifier" @addChapter="registerChapter" @registerPage="registerPage" :identifier="presenter.projectTree.props.identifier" />
        </div>
        <ChapterTree v-for="chapter in presenter.projectTree.chapters" :nestLevel="1" :data="chapter" :key="chapter.props.identifier" @addChapter="registerChapter"/>
        <PageTree v-for="page in presenter.projectTree.pages" :nestLevel="1" :data="page" :key="page.props.identifier" @onPageClick="selectPage" />
      </Nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BookEntity from "@/entities/Book";
import PageEntity from '@/entities/Page'
import Nav from "@/components/Base/Nav.vue";
import NavItem from "@/components/Base/NavItem.vue";
import ProjectTreeMenu from "@/components/Modules/ProjectTreeMenu.vue";
import ChapterTree from "@/components/Modules/Tree/ChapterTree.vue";
import PageTree from '@/components/Modules/Tree/PageTree.vue'

import Presenter, { PresenterParams, IPresenter } from "./presenter";
import FetchProjectTreeUseCase from "@/usecases/projectTree/FetchProjectTreeUseCase";
import ErrorService from "@/services/ErrorService";

// Use Case
import RegisterChapterUseCase from "@/usecases/RegisterChapterUseCase";
import RegisterPageUseCase from '@/usecases/RegisterPageUseCase'
import SelectPageUseCase from '@/usecases/SelectPageUseCase'

// Repositories
import PageContentRepository from '@/repositories/PageContentRepository'
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";

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
        projectTreeRepository: new ProjectTreeRepository()
      });
    }
  },
  methods: {
    async fetch() {
      const usecase = new FetchProjectTreeUseCase({
        projectTreeRepository: new ProjectTreeRepository(),
        ref: this.book.getProps().projectTree,
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
    async registerPage({ name, parentId }: { name: string, parentId: string }) {
      const usecase = new RegisterPageUseCase({
        projectTreeEntity: this.presenter.projectTree,
        pageContentRepository: new PageContentRepository,
        projectTreeRepository: new ProjectTreeRepository,
        errorService: new ErrorService({ context: 'Registering page' })
      })

      await usecase.execute({ name, parentId })
    },
    async selectPage(pageEntity: PageEntity) {
      const usecase = new SelectPageUseCase({
        pagecontentRepository: new PageContentRepository(),
        errorService: new ErrorService({ context: 'Selecting Page' })
      })

      await usecase.execute(pageEntity)
    }
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
