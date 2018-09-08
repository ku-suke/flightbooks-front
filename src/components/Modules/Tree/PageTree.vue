<template>
  <NavItem>
    {{ data.props.title }}
  </NavItem>
</template>

<script lang="ts">
import Vue from 'vue'
import NavItem from '@/components/Base/NavItem.vue'

import PageTreeEntity from '@/entities/PageTree'

export default Vue.extend({
  components: {
    NavItem
  },
  props: {
    data: {
      type: Object as () => PageTreeEntity,
      required: true
    }
  }
})
</script>
