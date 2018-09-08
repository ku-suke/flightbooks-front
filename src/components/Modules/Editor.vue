<template>
  <div class="Editor">
    <MarkdownEditor :value="editorContent" :configs="configs" @input="handleInput"/>
    <Button class="Editor__Save" text="保存" :size="ButtonSize.Small" @click="handleSave"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MarkdownEditor from 'vue-simplemde/src/markdown-editor.vue'
import Button, { Size as ButtonSize } from '@/components/Base/Button.vue'

interface IData {
  editorContent: string,
  ButtonSize: typeof ButtonSize
}

export default Vue.extend({
  data(): IData {
    return {
      editorContent: '',
      ButtonSize
    }
  },
  components: {
    MarkdownEditor,
    Button
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    configs: {
      type: Object as () => any,
      default: {}
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        // Copy to component state
        if (val) {
          this.editorContent = val
        }
      }
    }
  },
  methods: {
    handleInput(content: string | null) {
      if (content) this.$emit('input', content)
    },
    handleSave() {
      this.$emit('save')
    }
  }
})
</script>

<style>
.Editor {
  position: relative;
}

.Editor__Save {
  position: absolute;
  top: 8px;
  right: 0;
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
