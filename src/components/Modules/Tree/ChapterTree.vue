<template>
  <Nav :label="data.getProps().name">
    <div slot="menu">
      <ChapterMenu />
    </div>
    <Chapter v-for="chapter in data.chapters" :data="chapter" :key="chapter.props.title" />
    <PageTree v-for="page in data.pages" :key="page.props.title" :data="page" />
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from '@/components/Base/Nav.vue'
import ChapterMenu from '@/components/Modules/ChapterMenu.vue'
import PageTree from '@/components/Modules/Tree/PageTree.vue'

import ChapterEntity from '@/entities/Chapter'

export default Vue.extend({
  components: {
    Nav,
    ChapterMenu,
    PageTree
  },
  name: 'Chapter',
  props: {
    data: {
      type: Object as () => ChapterEntity,
      required: true
    }
  }
})
</script>
