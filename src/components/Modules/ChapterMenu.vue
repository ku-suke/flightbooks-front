<template>
  <div class="ChapterMenu">
    <button class="ChapterMenu__Item" title="ページを追加" @click="showRegisterPageModal = true">
      <Icon name="add-file" />
    </button>
    <button class="ChapterMenu__Item" title="チャプターを追加" @click="showRegisterChapterModal = true">
      <Icon name="add-folder" />
    </button>
    <button class="ChapterMenu__Item" title="名前を変更" @click="openRenameModal">
      <Icon name="edit" />
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
    <Modal v-show="showRenameChapterModal" @close="showRenameChapterModal = false">
      <div slot="header">
        <h2>名前を変更</h2>
      </div>
      <template slot="body">
        <form class="ChapterMenu__Form" @submit.prevent="renameChapter">
          <FormBlock label="チャプター名">
            <BaseInput placeholder="My New Project" v-model="newChapterName"/>
          </FormBlock>
          <el-button type="primary" native-type="submit" :disabled="!newChapterName" round>更新</el-button>
        </form>
      </template>
    </Modal>
    <Modal v-show="showRegisterPageModal" @close="showRegisterPageModal = false">
      <div slot="header">
        <h2>ページを追加</h2>
      </div>
      <template slot="body">
        <form class="ProjectMenu__Form" @submit.prevent="registerPage">
          <FormBlock label="ページ名">
            <BaseInput placeholder="My New Project" v-model="newPageName"/>
          </FormBlock>
          <el-button type="primary" native-type="submit" :disabled="!newPageName" round>追加</el-button>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Base/Modal.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import BaseInput from "@/components/Base/Input.vue";
import Icon from "@/components/Base/Icon.vue";

interface IData {
  showRegisterChapterModal: boolean;
  showRegisterPageModal: boolean;
  showRenameChapterModal: boolean;
  newChapterName: string;
  newPageName: string;
}

export default Vue.extend({
  components: {
    Modal,
    FormBlock,
    BaseInput,
    Icon
  },
  props: {
    identifier: {
      type: String,
      required: true
    }
  },
  data(): IData {
    return {
      showRegisterChapterModal: false,
      showRegisterPageModal: false,
      showRenameChapterModal: false,
      newChapterName: "",
      newPageName: ""
    };
  },
  methods: {
    addChapter() {
      const name = this.newChapterName;
      const parentId = this.identifier;
      this.$emit("addChapter", { name, parentId });
      this.newChapterName = "";
      this.showRegisterChapterModal = false;
    },
    openRenameModal() {
      this.showRenameChapterModal = true;
    },
    renameChapter() {
      this.$emit("renameChapter", this.newChapterName);
      this.newChapterName = "";
      this.showRenameChapterModal = false;
    },
    registerPage() {
      const name = this.newPageName;
      const parentId = this.identifier;
      this.$emit("registerPage", { name, parentId });
      this.newPageName = "";
      this.showRegisterPageModal = false;
    }
  }
});
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
  transition: 0.3s;
  border: none;
}

.ChapterMenu__Item:hover {
  cursor: pointer;
}

.ChapterMenu__Item:hover,
.ChapterMenu__Item:focus {
  box-shadow: 0px 0px 0px 2px rgba(85, 85, 85, 1);
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
