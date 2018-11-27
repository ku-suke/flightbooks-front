<template>
  <div class="Nav" :class="{ '-isExpanded': isExpanded }">
    <button class="Nav__Header" :style="nestStyle" @click="isExpanded = !isExpanded">
      <div class="Nav__Title">
        <i class="el-icon-arrow-right Nav__Icon" /> {{ label }}
      </div>
    </button>
    <div class="Nav__Menu" v-if="$slots['menu']">
      <slot name="menu" />
    </div>
    <div class="Nav__Body" v-show="isExpanded">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import uuid from "uuid/v4";

interface IData {
  isExpanded: boolean;
}

export default Vue.extend({
  data(): IData {
    return {
      isExpanded: true
    };
  },
  props: {
    label: {
      type: String,
      required: true
    },
    nestLevel: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nestStyle(): any {
      return {
        "padding-left": `${this.nestLevel * 16 + 4}px`
      };
    }
  }
});
</script>

<style scoped>
.Nav {
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.Nav__Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  line-height: 48px;
  width: 100%;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  text-align: left;
  transition: 0.3s;
  font-weight: 500;
  outline: none;
}

.Nav__Header:hover {
  cursor: pointer;
}

.Nav__Header:hover,
.Nav__Header:focus {
  background-color: rgba(0, 79, 153, 0.492);
}

.Nav__Header > .Nav__Title > .Nav__Icon {
  transition: 0.3s;
}

.Nav.-isExpanded > .Nav__Header > .Nav__Title > .Nav__Icon {
  transform: rotate(90deg);
}

.Nav__Menu {
  position: absolute;
  right: 14px;
  top: 14px;
}
</style>
