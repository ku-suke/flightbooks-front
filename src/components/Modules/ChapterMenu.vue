<template>
  <div class="ChapterMenu">
    <button class="ChapterMenu__Item" title="チャプターを追加">
      <i class="el-icon-tickets" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style scoped>
.ChapterMenu {
  display: flex;
}

.ChapterMenu__Item {
  outline: none;
  background-color: transparent;
  color: #fff;
  transition: .3s;
  border: none;
  box-shadow: 0px 0px 0px 2px rgba(85,85,85,1);
}

.ChapterMenu__Item:hover {
  cursor: pointer;
}

.ChapterMenu__Item:hover,
.ChapterMenu__Item:focus {
  box-shadow: 1px 1px 1px 1px rgba(85,85,85,1);
  box-shadow: 0px 0px 26px -10px rgba(0,0,0,0.75);
}

</style>
