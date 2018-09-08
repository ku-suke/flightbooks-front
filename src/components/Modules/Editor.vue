<template>
  <div class="Editor">
    <MarkdownEditor :value="editorContent" class="BookDetail__Editor" :configs="configs" @input="handleInput"/>
    <button @click="handleSave">Save</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MarkdownEditor from 'vue-simplemde/src/markdown-editor.vue'

interface IData {
  editorContent: string
}

export default Vue.extend({
  data(): IData {
    return {
      editorContent: ''
    }
  },
  components: {
    MarkdownEditor
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

