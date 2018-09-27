<template>
  <div class="BookDetail">
    <div class="BookDetail__Left">
      <BookNav :book="presenter.book" />
    </div>
    <div class="BookDetail__Center">
      <Editor v-if="presenter.content" v-model="editorContent" class="BookDetail__Editor" :configs="editorConfig" @save="updateContent"/>
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
import editorConfig from "@/utils/editorConfig";
import ErrorService from "@/services/ErrorService";
import Editor from "@/components/Modules/Editor.vue";
import BookNav from "@/containers/Book/Detail/Nav/index.vue";

import Presenter, { IPresenter } from "./presenter";

// Use Case
import FetchBookUseCase from "@/usecases/Book/FetchBookUseCase";
import UpdateContentUseCase from "@/usecases/UpdateContentUseCase";
import DestroyContainerUseCase from "./DestroyContainerUseCase";

// Repositories
import BookRepository from "@/repositories/BookRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import PageContentRepository from "@/repositories/PageContentRepository";

interface IData {
  showModal: boolean;
  isRegistering: boolean;
  editorConfig: any;
  editorContent: string;
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
      editorConfig,
      editorContent: ""
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
  watch: {
    "presenter.content": {
      immediate: true,
      handler(val, oldVal) {
        // Copy to component state
        if (val) {
          this.editorContent = val;
        }
      }
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
    async updateContent() {
      const usecase = new UpdateContentUseCase({
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "UpdateContent UseCase" }),
        projectId: this.id
      });
      await usecase.execute(this.editorContent);
    }
  },
  async mounted() {
    await this.fetchBook();
  },
  async destroyed() {
    await new DestroyContainerUseCase({
      bookRepository: new BookRepository(),
      projectTreeRepository: new ProjectTreeRepository()
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
