<template>
  <button :class="[typeClassName, sizeClassName, { '-autoWidth': autoWidth }]" :type="nativeType" :disabled="disabled" class="Button" @click="handleClick" >
    <div class="Button__Text">{{ text }}</div>
    <i v-if="loading" class="Button__Icon el-icon-loading" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export enum Type {
  Primary = 'primary',
  Secondary = 'secondary',
  Destructive = 'destructive'
}

export enum Size {
  Small = 'small',
  Midium = 'midium',
  Large = 'large'
}

export default Vue.extend({
  props: {
    nativeType: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: Type.Primary
    },
    size: {
      type: String,
      default: Size.Midium
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeClassName(): string {
      return `-${this.type}`;
    },
    sizeClassName(): string {
      return `-${this.size}`;
    }
  },
  methods: {
    handleClick(): void {
      this.$emit('click');
    }
  }
});
</script>

<style scoped>
.Button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: calc(8px * 19);
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: .3s;
}
.Button.-autoWidth {
  width: 100%;
}
.Button__Icon {
  fill: currentColor;
}
.Button.-small {
  height: calc(8px * 4);
  padding: 0 calc(8px * 2);
  font-size: 14px;
}
.Button.-small .Button__Icon {
  margin-left: 8px;
}
.Button.-midium {
  height: calc(8px * 5);
  padding: 0 calc(8px * 2);
  font-size: 14px;
}
.Button.-midium .Button__Icon {
  margin-left: 4px;
  font-size: 16px;
}
.Button.-large {
  height: calc(8px * 6);
  padding: 0 calc(8px * 3);
  font-size: 16px;
}
.Button.-large .Button__Icon {
  width: calc(8px * 3);
  height: calc(8px * 3);
  margin-right: calc(8px * 2);
}
.Button.-primary {
  color: #fff;
  background: #070707;
}
.Button.-primary:hover {
  opacity: .6;
}
.Button.-primary:active {
  background: #070707;
}
.Button.-primary[disabled] {
  pointer-events: none;
  color: #aaa;
  background: #dadbe3;
  cursor: not-allowed;
}
.Button.-secondary {
  color: #070707;
  border: 1px solid #070707;
  background: #fff;
}
.Button.-secondary:hover {
  background: #e6f5fb; /* TODO カラーパレットが修正され次第変更 */
}
.Button.-secondary:active {
  background: #cdecf9; /* TODO カラーパレットが修正され次第変更 */
}
.Button.-secondary[disabled] {
  pointer-events: none;
  color: #ddd;
  border: none;
  background: red;
}
.Button.-destructive {
  color: #fff;
  background: #e70; /* TODO カラーパレットが修正され次第変更 */
}
.Button.-destructive[disabled] {
  pointer-events: none;
  color: #ddd;
  border: none;
  background: red;
}
</style>
