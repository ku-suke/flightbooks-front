<template>
  <div class="Editor" @drop.prevent="onDrop" >
    <MarkdownEditor
      ref="markdownEditor"
      :value="pageContent.props.content"
      @input="updateContent"
      :highlight="true"
      :configs="configs"
    />
    <Button class="Editor__Save" text="保存" :loading="isSaving" :size="ButtonSize.Small" @click="handleSave"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import firebase from "firebase";
import MarkdownEditor from "vue-simplemde/src/markdown-editor.vue";
import Button, { Size as ButtonSize } from "@/components/Base/Button.vue";
import PageContentEntity from "@/entities/PageContent";
import hljs from "highlight.js";
interface Window {
  hljs: hljs;
}
declare var window: Window;
window.hljs = hljs;

interface IData {
  ButtonSize: typeof ButtonSize;
  pageContent: PageContentEntity;
  configs: Object;
}

export default Vue.extend({
  data(): IData {
    return {
      ButtonSize,
      pageContent: null,
      configs: {
        showIcons: ["code", "table"],
        spellChecker: false,
        codeSyntaxHighlighting: true
      }
    };
  },
  components: {
    MarkdownEditor,
    Button
  },
  props: {
    isSaving: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object as () => PageContentEntity,
      required: true
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(pageContent: PageContentEntity) {
        // Copy to component state
        if (pageContent) {
          this.pageContent = pageContent;
        }
      }
    }
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    },
    fileAllowedTypes() {
      return {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/jpg": "jpg",
        "image/gif": "gif",
        "image/svg+xml": "svg"
      };
    }
  },
  methods: {
    handleSave() {
      this.$emit("save", this.pageContent);
    },
    updateContent(content: string) {
      (this.pageContent as PageContentEntity).updateContent(content);
    },
    uploadFileName(file, filename) {
      return `books/${store.state.book.item.identifier}/assets/${filename}.${
        this.fileAllowedTypes[file.type]
      }`;
    },
    onDrop(event) {
      let files = event.target.files
        ? event.target.files
        : event.dataTransfer.files;
      if (files.length > 0) {
        let file = files[0];
        if (file.type in this.fileAllowedTypes) {
          var cm = this.simplemde.codemirror;
          var line = cm.getCursor().line;
          var ch = cm.getCursor().ch;
          var fileName = this.uploadFileName(file, new Date().getTime());
          var storageRef = firebase.storage().ref(fileName);
          storageRef.put(file).then(function(snapshot) {
            storageRef.getDownloadURL().then(function(url) {
              var text = "\n![" + file.name + "](" + url + ")\n";
              cm.replaceRange(
                text,
                { line: line, ch: ch },
                { line: line, ch: ch }
              );
            });
          });
        } else {
          console.log(`unknown file type: ${file.type}`);
        }
      } else {
        console.log("files.length <= 0");
      }
    }
  }
});
</script>

<style lang="scss">
.Editor {
  position: relative;
}

.Editor__Save {
  position: absolute;
  top: 8px;
  right: 16px;
}

.editor-toolbar {
  border: none !important;
}

.CodeMirror {
  background-color: #f4f4f4 !important;
  border-radius: 8px !important;
  margin: 0 16px !important;
  min-height: 500px !important;
}
@font-face {
  font-family: "GenShinGothic";
  font-style: normal;
  font-weight: 300;
  src: local("GenShinGothic"),
    url(https://storage.googleapis.com/flightbooks-a72f0.appspot.com/generate/GenShinGothic-P-Regular.ttf)
      format("truetype");
}

@font-face {
  font-family: "GenShinGothic";
  font-style: normal;
  font-weight: 500;
  src: local("GenShinGothic"),
    url(https://storage.googleapis.com/flightbooks-a72f0.appspot.com/generate/GenShinGothic-P-Medium.ttf)
      format("truetype");
}

@font-face {
  font-family: "Myrica";
  font-style: normal;
  font-weight: 400;
  src: local("Myrica"),
    url(https://storage.googleapis.com/flightbooks-a72f0.appspot.com/generate/Myrica.TTC)
      format("truetype");
}
.editor-preview-side {
  font-size: 11pt;
  font-family: "GenShinGothic", "HelveticaNeue", "Helvetica Neue", Helvetica,
    Arial, sans-serif !important;
  line-height: 1.75;
  ul {
    list-style: square;
  }
  img {
    margin: 1em auto 0.5em;
    border: 1px solid #999;
    max-width: 90% !important;
    max-height: 640px !important;
  }
  a img {
    border: none;
  }
  a:link,
  a:visited {
    background: transparent;
    font-weight: 500;
    text-decoration: none;
    color: #333;
  }

  a[href^="http"]:link:after,
  a[href^="http"]:visited:after {
    content: "（" attr(href) " ）";
    font-size: 90%;
  }

  abbr[title]:after {
    content: "（ " attr(title) " ）";
  }
  a[href^="#"]:after,
  a[href^="JavaScript:"]:after {
    content: "";
  }
  strong,
  b {
    font-weight: 500;
  }
  table {
    margin: 1px;
    border: 1px solid #333;
    text-align: left;
    word-wrap: break-word;
    table-layout: fixed;
    width: 99%;
  }

  th {
    border-bottom: 1px solid #333;
    font-weight: 500;
  }

  td {
    border-bottom: 1px solid #333;
  }

  tbody tr:last-child td,
  tbody tr:last-child th {
    border-bottom: none;
  }

  th,
  td {
    padding: 4px 10px;
  }

  tfoot {
    font-style: italic;
  }

  caption {
    background: #fff;
    margin-bottom: 2em;
    text-align: left;
  }

  thead {
    display: table-header-group;
  }

  img,
  tr {
    page-break-inside: avoid;
  }
  h1 {
    font-size: 20pt;
    border-bottom: #000 4px solid;
    border-left: #000 12px solid;
    padding-left: 12px;
  }

  h2 {
    margin-top: 2.5em;
    margin-bottom: 0.8em;
    font-size: 17pt;
    border-bottom: #000 2px solid;
  }

  h3,
  h4,
  h5 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-size: 16pt;
  }

  p code,
  li code {
    border: 1px solid #000;
    background-color: #f3f3f3;
    border-radius: 1px;
    font-weight: bold;
    padding: 2px 3px;
  }

  code {
    font-size: 11pt;
    font-family: "Myrica", monospace;
  }

  pre {
    padding: 10px 7px 10px;
    border: 1px solid #000;
    background-color: #f3f3f3;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  blockquote {
    width: 100%;
    margin: 1.2em;
    padding: 1em;
    font-size: 11pt;
    word-wrap: break-word;
  }
  h1:before {
    content: "第 N 章";
    margin-right: 0.6em;
  }
  h2 {
    counter-increment: counter-h2;
  }
  h2:before {
    content: "N." counter(counter-h2);
    margin-right: 0.6em;
  }
}
</style>
