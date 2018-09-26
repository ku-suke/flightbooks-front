<template>
  <button class="BookEmpty" @click="handleClick">
    <div class="BookEmpty__Icon">
      <i class="el-icon-plus" />
    </div>
    <div class="BookEmpty__Text">新規プロジェクトを作成</div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
});
</script>

<style scoped>
.BookEmpty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 240px;
  width: 240px;
  border-radius: var(--radius-lv2);
  box-shadow: var(--shadow-normal);
  cursor: pointer;
  transition: var(--transition-normal);
  font-size: var(--fontSize-normal);
}

.BookEmpty:hover {
  background-color: var(--color-light-gray);
}

.BookEmpty__Icon {
  margin-bottom: var(--space-lv1);
}
</style>
