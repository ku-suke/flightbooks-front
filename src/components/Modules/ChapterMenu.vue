<template>
  <div class="ChapterMenu">
    <button class="ChapterMenu__Item" title="チャプターを追加" @click="showRegisterChapterModal = true">
      <Icon name="add-folder" />
    </button>
    <Modal v-show="showRegisterChapterModal" @close="showRegisterChapterModal = false">
      <div slot="header">
        <h2>チャプターを追加</h2>
      </div>
      <template slot="body">
        <form class="ChapterMenu__Form" @submit.prevent="addChapter">
          <FormBlock label="チャプター名">
            <BaseInput placeholder="My New Project" v-model="newChapterName"/>
          </FormBlock>
          <el-button type="primary" native-type="submit" :disabled="!newChapterName" round>追加</el-button>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from "@/components/Base/Modal.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import BaseInput from "@/components/Base/Input.vue";
import Icon from '@/components/Base/Icon.vue'

interface IData {
  showRegisterChapterModal: boolean,
  newChapterName: string
}

export default Vue.extend({
  components: {
    Modal,
    FormBlock,
    BaseInput,
    Icon
  },
  data(): IData {
    return {
      showRegisterChapterModal: false,
      newChapterName: ''
    }
  },
  methods: {
    addChapter() {
      this.$emit('addChapter', this.newChapterName)
      this.newChapterName = ''
      this.showRegisterChapterModal = false
    }
  }
})
</script>

<style scoped>
.ChapterMenu {
  display: flex;
}

.ChapterMenu__Item {
  width: 24px;
  height: 24px;
  padding: 3px;
  outline: none;
  background-color: transparent;
  color: #fff;
  transition: .3s;
  border: none;
}

.ChapterMenu__Item:hover {
  cursor: pointer;
}

.ChapterMenu__Item:hover,
.ChapterMenu__Item:focus {
  box-shadow: 0px 0px 0px 2px rgba(85,85,85,1);
}

.ChapterMenu__Item svg {
  display: none;
  fill: #fff;
}

.ChapterMenu__Item:hover svg,
.ChapterMenu__Item:focus svg {
  display: block;
}

.ChapterMenu__Form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
