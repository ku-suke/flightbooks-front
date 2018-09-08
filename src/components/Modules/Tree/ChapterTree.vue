<template>
  <Nav :label="data.props.title">
    <div slot="menu">
      <ChapterMenu />
    </div>
    <ChapterTree v-for="chapter in data.chapters" :data="chapter" :key="chapter.props.title" />
    <PageTree v-for="page in data.pages" :key="page.props.title" :data="page" />
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from '@/components/Base/Nav.vue'
import ChapterMenu from '@/components/Modules/ChapterMenu.vue'
import PageTree from '@/components/Modules/Tree/PageTree.vue'

import ChapterTreeEntity from '@/entities/ChapterTree'

export default Vue.extend({
  components: {
    Nav,
    ChapterMenu,
    PageTree
  },
  name: 'ChapterTree',
  props: {
    data: {
      type: Object as () => ChapterTreeEntity,
      required: true
    }
  }
})
</script>
