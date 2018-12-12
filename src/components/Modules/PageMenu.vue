<template>
  <div class="PageMenu">
    <button class="PageMenu__Item" title="ページを削除" @click.stop="confirmDeletePage">
      <Icon name="add-file"/>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "@/components/Base/Icon.vue";

export default Vue.extend({
  components: {
    Icon
  },
  props: {
    identifier: {
      type: String,
      required: true
    }
  },
  methods: {
    confirmDeletePage() {
      if (confirm("削除してよろしいですか？")) {
        this.$emit("deletePage");
      }
    }
  }
});
</script>

<style scoped>
.PageMenu {
  display: flex;
  position: relative;
  right: 14px;
  top: 14px;
}
.PageMenu__Item {
  width: 24px;
  height: 24px;
  padding: 3px;
  outline: none;
  background-color: transparent;
  color: #fff;
  transition: 0.3s;
  border: none;
}
.PageMenu__Item:hover {
  cursor: pointer;
}
.PageMenu__Item:hover,
.PageMenu__Item:focus {
  box-shadow: 0px 0px 0px 2px rgba(85, 85, 85, 1);
}
.PageMenu__Item svg {
  fill: #fff;
}
.PageMenu__Item:hover svg,
.PageMenu__Item:focus svg {
  display: block;
}
</style>
