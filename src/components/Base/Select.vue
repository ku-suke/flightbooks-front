<template>
  <select
    :name="name"
    :disabled="disabled"
    class="Select"
  >
    <slot/>
  </select>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    }
  }
});
</script>

<style scoped lang="postcss">
.Select {
  box-sizing: border-box;
  font-size: 14px;
  min-height: 50px;
  padding: 10px 18px;
  line-height: 30px;
  color: #070707;
  background-color: #f6f6f6;
  outline: none;
  border: 1px solid #dadbe3;
  border-radius: 4px;
  transition: 0.3s;
  -webkit-appearance: none;
}
</style>
