<template>
  <div class="BookDetail">
    <div class="BookDetail__Left">
      <BookNav :book="presenter.book" />
    </div>
    <div class="BookDetail__Center">
      <Editor v-model="editorContent" class="BookDetail__Editor" :configs="editorConfig" @save="updateContent"/>
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
import BookRepository from "@/repositories/BookRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import ErrorService from "@/services/ErrorService";
import Editor from "@/components/Modules/Editor.vue";
import BookNav from "@/containers/Book/Detail/Nav/index.vue";

import Presenter, { IPresenter } from "./presenter";

// Use Case
import LoadContainerUseCase from "./LoadContainerUseCase";
import UpdateContentUseCase from "@/usecases/UpdateContentUseCase";
import DestroyContainerUseCase from "./DestroyContainerUseCase";

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
        bookRepository: new BookRepository()
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
    async loadItem() {
      const usecase = new LoadContainerUseCase({
        bookRepository: new BookRepository(),
        projectTreeRepository: new ProjectTreeRepository(),
        errorService: new ErrorService({ context: "LoadContainer UseCase" }),
        projectId: this.id
      });
      await usecase.execute();
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
    await this.loadItem();
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
</style>
