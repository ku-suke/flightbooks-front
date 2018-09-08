<template>
  <div class="Nav" :class="{ '-isExpanded': isExpanded }">
    <button class="Nav__Header" @click="isExpanded = !isExpanded">
      <div class="Nav__Title">
        <i class="el-icon-arrow-right Nav__Icon" /> {{ label }}
      </div>
      <div class="Nav__Menu" v-if="$slots['menu']">
        <slot name="menu" />
      </div>
    </button>
    <div class="Nav__Body" v-show="isExpanded">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  isExpanded: boolean
}

export default Vue.extend({
  data(): IData {
    return {
      isExpanded: false
    }
  },
  props: {
    label: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.Nav {
  width: 100%;
  box-sizing: border-box;
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
  transition: .3s;
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
  transition: .3s;
}

.Nav.-isExpanded > .Nav__Header > .Nav__Title > .Nav__Icon {
  transform: rotate(90deg)
}

.Nav__Body > *:nth-child(n) {
  padding: 0 0 0 16px;
}

.Nav__Menu {
  padding-right: 8px;
}

</style>

