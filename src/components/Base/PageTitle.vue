<template>
  <div class="PageTitle">{{ label }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.PageTitle {
  font-size: var(--fontSize-h1);
  height: 100%;
  width: 100%;
  text-align: center;
  margin-bottom: var(--space-lv4);
}
</style>
