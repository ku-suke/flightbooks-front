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
      <MarkdownEditor v-model="content" class="BookDetail__Editor" :configs="editorConfig"/>
      <button @click="save">Save</button>
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

interface IData {
  project: IBook;
  showModal: boolean;
  isRegistering: boolean;
  content: string;
  editorConfig: any
}

export default Vue.extend({
  components: {
    MarkdownEditor
  },
  data(): IData {
    return {
      project: {
        title: "",
        genre: 0,
      },
      showModal: false,
      isRegistering: false,
      content: "",
      editorConfig
    };
  },
  methods: {
    save() {
      alert("Saved!!")
      alert(this.content)
    }
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

<style>
.CodeMirror-scroll {
  min-height: 70vh;
}
</style>
