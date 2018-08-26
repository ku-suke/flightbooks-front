<template>
  <label class="FormBlock">
    <span v-if="label" class="FormBlock__Label">
      <span class="FormBlock__LabelText">
        {{ label }}
      </span>
      <span v-if="required" class="FormBlock__LabelTag">
        必須の項目です
      </span>
    </span>
    <slot/>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped lang="postcss">
.FormBlock {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #070707;
  margin-bottom: 16px;
}
.FormBlock__Label {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
}
.FormBlock__LabelText {
}
.FormBlock__LabelTag {
  margin-left: 8px;
  padding: calc(8px * 0.5) calc(8px * 0.75);
  color: #fff;
  border-radius: 4px;
  background-color: #f26161;
  font-size: 12px;
  line-height: 12px;
}
</style>
