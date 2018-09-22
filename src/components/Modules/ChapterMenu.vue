<template>
  <div class="ChapterMenu">
    <button class="ChapterMenu__Item" title="チャプターを追加" @click="showRegisterChapterModal = true">
      <i class="el-icon-tickets" />
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

interface IData {
  showRegisterChapterModal: boolean,
  newChapterName: string
}

export default Vue.extend({
  components: {
    Modal,
    FormBlock,
    BaseInput
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
  outline: none;
  background-color: transparent;
  color: #fff;
  transition: .3s;
  border: none;
  box-shadow: 0px 0px 0px 2px rgba(85,85,85,1);
}

.ChapterMenu__Item:hover {
  cursor: pointer;
}

.ChapterMenu__Item:hover,
.ChapterMenu__Item:focus {
  box-shadow: 1px 1px 1px 1px rgba(85,85,85,1);
  box-shadow: 0px 0px 26px -10px rgba(0,0,0,0.75);
}

.ChapterMenu__Form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
