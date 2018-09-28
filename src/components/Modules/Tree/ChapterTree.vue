<template>
  <Nav :label="data.props.name" :nestLevel="nestLevel">
    <div slot="menu">
      <ChapterMenu :identifier="data.props.identifier" @addChapter="handleAddChapter" @renameChapter="handleRenameChapter" @registerPage="handleRegisterPage" />
    </div>
    <ChapterTree v-for="chapter in data.chapters" :nestLevel="nestLevel + 1" :data="chapter" :key="chapter.props.identifier" @addChapter="handleAddChapter" @registerPage="handleRegisterPage" @onPageClick="handleOnPageClick"/>
    <PageTree v-for="page in data.pages" :key="page.props.title" :nestLevel="nestLevel + 1" :data="page" :currentPage="currentPage" @onPageClick="handleOnPageClick" />
  </Nav>
</template>

<script lang="ts">
import Vue from "vue";
import Nav from "@/components/Base/Nav.vue";
import ChapterMenu from "@/components/Modules/ChapterMenu.vue";
import PageTree from "@/components/Modules/Tree/PageTree.vue";

import ChapterEntity from "@/entities/Chapter";
import PageEntity from "@/entities/Page";

export default Vue.extend({
  name: "ChapterTree",
  components: {
    Nav,
    ChapterMenu,
    PageTree
  },
  props: {
    data: {
      type: Object as () => ChapterEntity,
      required: true
    },
    nestLevel: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleAddChapter({ name, parentId }: { name: string; parentId: string }) {
      this.$emit("addChapter", { name, parentId });
    },
    handleRenameChapter(name: string) {
      this.$emit("renameChapter", name);
    },
    handleRegisterPage({ name, parentId }: { name: string; parentId: string }) {
      this.$emit("registerPage", { name, parentId });
    },
    handleOnPageClick(item: PageEntity) {
      this.$emit("onPageClick", item);
    }
  }
});
</script>
