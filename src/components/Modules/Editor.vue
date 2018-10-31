<template>
  <div class="Editor" @drop.prevent="onDrop" >
    <MarkdownEditor
      ref="markdownEditor"
      :value="pageContent.props.content"
      @input="updateContent"
      :configs="configs"
    />
    <Button class="Editor__Save" text="保存" :loading="isSaving" :size="ButtonSize.Small" @click="handleSave"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MarkdownEditor from "vue-simplemde/src/markdown-editor.vue";
import Button, { Size as ButtonSize } from "@/components/Base/Button.vue";
import PageContentEntity from "@/entities/PageContent";

interface IData {
  ButtonSize: typeof ButtonSize;
  pageContent: PageContentEntity;
}

export default Vue.extend({
  data(): IData {
    return {
      ButtonSize,
      pageContent: null
    };
  },
  components: {
    MarkdownEditor,
    Button
  },
  props: {
    configs: {
      type: Object as () => any,
      default: {}
    },
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
    }
  },
  methods: {
    handleSave() {
      this.$emit("save", this.pageContent);
    },
    updateContent(content: string) {
      (this.pageContent as PageContentEntity).updateContent(content);
    },
    onDrop(event) {
      console.log(event);
      let allowedtype = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/jpg": "jpg",
        "image/gif": "gif",
        "image/svg+xml": "svg"
      };
      // Check if files were dropped
      let files = event.target.files
        ? event.target.files
        : event.dataTransfer.files;
      if (files.length > 0) {
        let file = files[0];
        if (file.type in allowedtype) {
          var cm = this.simplemde.codemirror;
          var line = cm.getCursor().line;
          var ch = cm.getCursor().ch;
          // var fileName = 'books/' + bookId + '/assets/' + (new Date()).getTime() + "." + allowedtype[file.type];
          // var storageRef = firebase.storage().ref(fileName);
          // storageRef.put(file).then(function(snapshot) {
          //   console.log('Uploaded a blob or file!'+fileName);
          //   storageRef.getDownloadURL().then(function(url) {
          //     var text = "\n!["+file.name+']('+url+")\n";
          //         cm.replaceRange(text,{line:line,ch:ch},{line:line,ch:ch});
          //   })
          // });
        } else {
          console.log(file.type);
        }
      }
    }
  }
});
</script>

<style>
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
</style>
