<template>
  <NavItem :label="data.props.name" :nestLevel="nestLevel">
    <div slot="menu">
    </div>
  </NavItem>
</template>

<script lang="ts">
import Vue from "vue";
import NavItem from "@/components/Base/NavItem.vue";
import PageEntity from '@/entities/Page'

export default Vue.extend({
  components: {
    NavItem,
  },
  props: {
    data: {
      type: Object as () => PageEntity,
      required: true
    },
    nestLevel: {
      type: Number,
      default: 0
    },
  }
});
</script>
