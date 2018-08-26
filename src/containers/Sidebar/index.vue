<template>
  <div class="Sidebar">
    <el-collapse accordion>
      <el-collapse-item title="プロジェクト" name="2">
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style scoped>
.Sidebar {
  min-height: 100vh;
  height: 100%;
  width: 260px;
  background-color: #555555;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  padding-top: 110px;
}
</style>
