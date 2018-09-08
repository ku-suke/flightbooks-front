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
          <ChapterMenu />
        </div>
        <ChapterTree v-for="chapter in presenter.projectTree.chapters" :data="chapter" :key="chapter.props.title" />
      </Nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from '@/components/Base/Nav.vue'
import NavItem from '@/components/Base/NavItem.vue'
import ChapterMenu from '@/components/Modules/ChapterMenu.vue'
import ChapterTree from '@/components/Modules/Tree/ChapterTree.vue'

import Presenter, { PresenterParams, IPresenter } from "./presenter";

export default Vue.extend({
  components: {
    Nav,
    NavItem,
    ChapterMenu,
    ChapterTree
  },
  computed: {
    presenter(): IPresenter {
      const params: PresenterParams = {}
      return Presenter(params)
    }
  },
})
</script>


<style scoped>
.BookNavi {
  height: 100%;
  width: 100%;
  background-color: #2E3235;
}
</style>
