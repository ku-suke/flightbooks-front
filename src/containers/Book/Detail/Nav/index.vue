<template>
  <div class="BookNavi">
    <div class="BookNavi__Navi">
      <Nav label="設定">
        <NavItem>
          プロジェクト設定
        </NavItem>
        <NavItem>
          出版設定
        </NavItem>
        <Nav label="設定">
          <NavItem>
            プロジェクト設定
          </NavItem>
          <NavItem>
            出版設定
          </NavItem>
          <Nav label="設定">
            <div slot="menu">
              <ChapterMenu />
            </div>
            <NavItem>
              プロジェクト設定
            </NavItem>
            <NavItem>
              出版設定
            </NavItem>
          </Nav>
        </Nav>
      </Nav>
      <Nav label="チャプター管理">
        <div slot="menu">
          <ProjectTreeMenu @addChapter="registerChapter" />
        </div>
        <ChapterTree v-for="chapter in presenter.projectTree.getChapters()" :data="chapter" :key="chapter.getProps().identifier" />
      </Nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookEntity from '@/entities/Book'
import Nav from '@/components/Base/Nav.vue'
import NavItem from '@/components/Base/NavItem.vue'
import ProjectTreeMenu from '@/components/Modules/ProjectTreeMenu.vue'
import ChapterTree from '@/components/Modules/Tree/ChapterTree.vue'

import Presenter, { PresenterParams, IPresenter } from "./presenter";
import FetchProjectTreeUseCase from '@/usecases/projectTree/FetchProjectTreeUseCase'
import ProjectTreeRepository from '@/repositories/ProjectTreeRepository'
import ErrorService from '@/services/ErrorService'

// Use Case
import RegisterChapterUseCase from '@/usecases/RegisterChapterUseCase'

export default Vue.extend({
  components: {
    Nav,
    NavItem,
    ProjectTreeMenu,
    ChapterTree
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
      })
    }
  },
  methods: {
    async fetch() {
      const usecase = new FetchProjectTreeUseCase({
        projectTreeRepository: new ProjectTreeRepository(),
        ref: this.book.getProps().projectTree,
        errorService: new ErrorService({ context: 'Fetching projectTree' })
      })

      await usecase.execute()
    },
    async registerChapter(name: string) {
      const usecase = new RegisterChapterUseCase({
        projectTreeEntity: this.presenter.projectTree,
        projectTreeRepository: new ProjectTreeRepository(),
        errorService: new ErrorService({ context: 'Registering chapter' })
      })

      await usecase.execute(name)
    }
  },
  watch: {
    book: {
      async handler(val: BookEntity) {
        if (!val) return
        await this.fetch()
      }
    }
  }
})
</script>


<style scoped>
.BookNavi {
  height: 100%;
  width: 100%;
  background-color: #2E3235;
}
</style>
