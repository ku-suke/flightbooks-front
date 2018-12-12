<template>
  <NavItem
    :label="data.tagline"
    :nestLevel="nestLevel"
    :isActive="data.identifier === currentPage"
    @click="handleClick"
  >
    <div slot="menu">
      <PageMenu :identifier="data.identifier" @deletePage="handleDeletePage"/>
    </div>
  </NavItem>
</template>

<script lang="ts">
import Vue from "vue";
import NavItem from "@/components/Base/NavItem.vue";
import PageMenu from "@/components/Modules/PageMenu.vue";
import PageEntity from "@/entities/Page";

export default Vue.extend({
  components: {
    NavItem,
    PageMenu
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
    currentPage: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick() {
      this.$emit("onPageClick", this.data);
    },
    handleDeletePage() {
      this.$emit("onDeletePage", this.data);
    }
  }
});
</script>
