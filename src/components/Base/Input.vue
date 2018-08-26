<template>
  <input
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :minlength="minlength"
    :maxlength="maxlength"
    :disabled="disabled"
    :readonly="readonly"
    class="Input"
    @input="handleInput"
  >
</template>

<script lang="ts">
import Vue from 'vue';
const types = ['text', 'search', 'email', 'date', 'password'];
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (t: any) => types.indexOf(t) !== -1
    },
    placeholder: {
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    listId: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput(e: any): void {
      this.$emit('input', e.target.value);
    }
  }
});
</script>

<style scoped lang="postcss">
.Input {
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
}
.Input::-webkit-input-placeholder {
  color: #dadbe3;
}
.Input[disabled] {
  opacity: 0.7;
}
.Input:focus {
  outline-color: ##41424e;
}
.Input[pattern]:valid {
  border-color: #6bbc33;
}
.Input[pattern]:invalid {
  border-color: red;
}
</style>
