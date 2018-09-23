<template>
  <div class="ProjectMenu">
    <button class="ProjectMenu__Item" title="チャプターを追加" @click="showRegisterChapterModal = true">
      <Icon name="add-folder" />
    </button>
    <Modal v-show="showRegisterChapterModal" @close="showRegisterChapterModal = false">
      <div slot="header">
        <h2>チャプターを追加</h2>
      </div>
      <template slot="body">
        <form class="ProjectMenu__Form" @submit.prevent="addChapter">
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
  },
})
</script>

<style scoped>
.ProjectMenu {
  display: flex;
}

.ProjectMenu__Item {
  width: 24px;
  height: 24px;
  padding: 3px;
  outline: none;
  background-color: transparent;
  color: #fff;
  transition: .3s;
  border: none;
}

.ProjectMenu__Item:hover {
  cursor: pointer;
}

.ProjectMenu__Item:hover,
.ProjectMenu__Item:focus {
  box-shadow: 0px 0px 0px 2px rgba(85,85,85,1);
}

.ProjectMenu__Item svg {
  display: none;
  fill: #fff;
}

.ProjectMenu__Item:hover svg,
.ProjectMenu__Item:focus svg {
  display: block;
}

.ProjectMenu__Form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
