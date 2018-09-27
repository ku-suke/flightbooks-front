<template>
  <div class="Editor">
    <MarkdownEditor :value="pageContent.props.content" @input="updateContent" :configs="configs" />
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
  methods: {
    handleSave() {
      this.$emit("save", this.pageContent);
    },
    updateContent(content: string) {
      (this.pageContent as PageContentEntity).updateContent(content);
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
