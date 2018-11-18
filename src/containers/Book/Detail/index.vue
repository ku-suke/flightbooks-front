<template>
  <div class="BookDetail">
    <div class="BookDetail__Left">
      <BookNav :book="presenter.book" />
    </div>
    <div class="BookDetail__Center">
      <Editor v-if="presenter.pageContent" :data="presenter.pageContent" :isSaving="isSaving" class="BookDetail__Editor" :configs="editorConfig" @save="saveContent"/>
      <div v-else class="BookDetail__EditorEmpty">← 左のサイドメニューから編集するページを選択、もしくは作成してください。</div>
    </div>
    <div class="BookDetail__Right">
      ここに画像管理UI(TBD)
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IBook } from "@/entities/Book";
import PageContentEntity from "@/entities/PageContent";
import editorConfig from "@/utils/editorConfig";
import ErrorService from "@/services/ErrorService";
import Editor from "@/components/Modules/Editor.vue";
import BookNav from "@/containers/Book/Detail/Nav/index.vue";

import Presenter, { IPresenter } from "./presenter";

// Use Case
import FetchBookUseCase from "@/usecases/Book/FetchBookUseCase";
import SavePageContentUseCase from "@/usecases/PageContent/SavePageContentUseCase";
import DestroyContainerUseCase from "./DestroyContainerUseCase";

// Repositories
import BookRepository from "@/repositories/BookRepository";
import PageContentRepository from "@/repositories/PageContentRepository";

interface IData {
  showModal: boolean;
  isRegistering: boolean;
  isSaving: boolean;
  editorConfig: any;
}

export default Vue.extend({
  components: {
    Editor,
    BookNav
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(): IData {
    return {
      showModal: false,
      isRegistering: false,
      isSaving: false,
      editorConfig
    };
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        bookRepository: new BookRepository(),
        pageContentRepository: new PageContentRepository()
      });
    }
  },
  methods: {
    async fetchBook() {
      const usecase = new FetchBookUseCase({
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "LoadContainer UseCase" })
      });
      await usecase.execute(this.id);
    },
    async saveContent(pageContent: PageContentEntity) {
      this.isSaving = true;

      try {
        const usecase = new SavePageContentUseCase({
          pageContentRepository: new PageContentRepository(),
          errorService: new ErrorService({ context: "UpdateContent UseCase" })
        });
        await usecase.execute(pageContent);
      } catch (error) {
        console.log(error);
      }

      this.isSaving = false;
    }
  },
  async mounted() {
    await this.fetchBook();
  },
  async destroyed() {
    await new DestroyContainerUseCase({
      bookRepository: new BookRepository()
    }).execute();
  }
});
</script>

<style scoped>
@import "~simplemde/dist/simplemde.min.css";

.BookDetail {
  display: flex;
}

.BookDetail__Left {
  flex: 2;
  min-width: 200px;
  height: 100vh;
  background-color: #2e3235;
}

.BookDetail__Center {
  flex: 6;
}

.BookDetail__Right {
  flex: 3;
  padding: 40px 20px;
}

.BookDetail__Editor {
  text-align: left;
}

.BookDetail__EditorEmpty {
  font-size: var(--fontSize-h3);
  font-weight: var(--fontWeight-bold);
  margin: var(--space-lv4) auto;
}
</style>
