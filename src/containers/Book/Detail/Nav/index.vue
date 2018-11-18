<template>
  <div class="BookNavi">
    <div class="BookNavi__Navi" v-if="presenter.book">
      <router-link :to="{ name: 'buildSetting', params: { id: presenter.book.identifier }}">
        <NavItem label="書籍をビルド">
          <i class="el-icon-printer" slot="icon" />
        </NavItem>
      </router-link>
      <Nav label="設定">
        <NavItem label="プロジェクト設定" />
        <NavItem label="出版設定" />
        <router-link :to="{ name: 'bookSetting', params: { id: presenter.book.identifier }}">
          <NavItem label="書籍設定" />
        </router-link>
      </Nav>
      <Nav label="章立て">
        <div slot="menu">
          <button class="Menu__Item" title="章を追加" @click="registerPage">
          <Icon name="add-file" />
        </button>
        </div>
        <PageTree v-for="page in presenter.book.pages" :nestLevel="1" :data="page" :key="page.props.identifier" :currentPage="presenter.currentPage" @onPageClick="selectPage" />
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
import RegisterPageUseCase from "@/usecases/RegisterPageUseCase";
import SelectPageUseCase from "@/usecases/SelectPageUseCase";

// Repositories
import PageContentRepository from "@/repositories/PageContentRepository";
import BuildJobRepository from "@/repositories/BuildJobRepository";
import UserRepository from "@/repositories/UserRepository";

// Components
import Nav from "@/components/Base/Nav.vue";
import NavItem from "@/components/Base/NavItem.vue";
import Icon from "@/components/Base/Icon.vue";
import PageTree from "@/components/Modules/Tree/PageTree.vue";
import BookRepository from "@/repositories/BookRepository";

export default Vue.extend({
  components: {
    Nav,
    NavItem,
    PageTree,
    Icon
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
        bookRepository: new BookRepository(),
        pageContentRepository: new PageContentRepository()
      });
    }
  },
  methods: {
    async registerPage({ name, parentId }: { name: string; parentId: string }) {
      const usecase = new RegisterPageUseCase({
        bookEntity: this.presenter.book,
        pageContentRepository: new PageContentRepository(),
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "Registering page" })
      });
      const content = "# Hello new chapter!\n";
      await usecase.execute({ content });
    },
    async selectPage(pageEntity: PageEntity) {
      const usecase = new SelectPageUseCase({
        pagecontentRepository: new PageContentRepository(),
        errorService: new ErrorService({ context: "Selecting Page" })
      });

      await usecase.execute(pageEntity);
    }
  },
  watch: {
    book: {
      async handler(val: BookEntity) {
        if (!val) return;
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
.Menu__Item {
  width: 24px;
  height: 24px;
  padding: 3px;
  outline: none;
  background-color: transparent;
  color: #fff;
  transition: 0.3s;
  border: none;
}
.Menu__Item:hover {
  cursor: pointer;
}
.Menu__Item:hover,
.Menu__Item:focus {
  box-shadow: 0px 0px 0px 2px rgba(85, 85, 85, 1);
}
.Menu__Item svg {
  fill: #fff;
}
.Menu__Item:hover svg,
.Menu__Item:focus svg {
  display: block;
}
</style>
