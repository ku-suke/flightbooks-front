<template>
  <div class="SectionHeader">
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.SectionHeader {
  font-size: 32px;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-bottom: 40px;
}
</style>
