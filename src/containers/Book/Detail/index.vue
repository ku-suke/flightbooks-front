<template>
  <div class="BookDetail">
    <div class="BookDetail__Left">
      <el-collapse class="BookDetail__GeneralMenu">
        <el-collapse-item title="設定" name="1">
          <div>プロジェクト設定</div>
          <div>出版設定</div>
        </el-collapse-item>
        <el-collapse-item title="ページ一覧" name="2">
          <div>ここに目次</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="BookDetail__Center">
      <MarkdownEditor v-model="editorContent" class="BookDetail__Editor" :configs="editorConfig"/>
      <button @click="updateContent">Save</button>
    </div>
    <div class="BookDetail__Right">
      ここに画像管理UI(TBD)
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MarkdownEditor from 'vue-simplemde/src/markdown-editor.vue'
import { IBook } from "@/entities/Book";
import editorConfig from "@/utils/editorConfig"
import BookRepository from '@/repositories/BookRepository'
import ErrorService from '@/services/ErrorService'

import Presenter, { PresenterParams, IPresenter } from "./presenter";

// Use Case
import LoadContainerUseCase, {
  ILoadContainerUseCase
} from "./LoadContainerUseCase";
import UpdateContentUseCase, { IUpdateContentUseCase } from '@/usecases/UpdateContentUseCase'

interface IData {
  showModal: boolean;
  isRegistering: boolean;
  editorConfig: any,
  editorContent: string
}

export default Vue.extend({
  components: {
    MarkdownEditor
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
      editorContent: ''
    };
  },
  computed: {
    presenter(): IPresenter {
      const params: PresenterParams = {
        bookRepository: new BookRepository,
      }

      return Presenter(params)
    }
  },
  watch: {
    'presenter.content': {
      immediate: true,
      handler(val, oldVal) {
        // Copy to component state
        if (val) {
          this.editorContent = val
        }
      }
    }
  },
  methods: {
    async loadItem() {
      const params: ILoadContainerUseCase = {
        bookRepository: new BookRepository,
        errorService: new ErrorService({context: 'LoadContainer UseCase'}),
        projectId: this.id
      }

      const usecase = new LoadContainerUseCase(params)
      await usecase.execute()
    },
    async updateContent() {
      const params: IUpdateContentUseCase = {
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: 'UpdateContent UseCase' }),
        projectId: this.id
      }

      const usecase = new UpdateContentUseCase(params)
      await usecase.execute(this.editorContent)
    }
  },
  async mounted() {
    await this.loadItem()
  }
});
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

.BookDetail {
  display: flex;
}

.BookDetail__Left {
  flex: 2;
  height: 100vh;
  background-color: #eee;
}

.BookDetail__Center {
  flex: 6;
  padding: 40px 20px;
}

.BookDetail__Right {
  flex: 3;
  padding: 40px 20px;
}

.BookDetail__Editor {
  text-align: left;
}

.BookDetail__Editor > .CodeMirror, .BookDetail__Editor > .CodeMirror-scroll {
  min-height: 500px;
}
</style>
