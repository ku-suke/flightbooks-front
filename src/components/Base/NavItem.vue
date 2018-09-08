<template>
  <button class="NavItem">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style scoped>
.NavItem {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  text-align: left;
  transition: .3s;
  box-sizing: border-box;
  outline: none;
}

.NavItem:hover {
  cursor: pointer;
}

.NavItem:hover,
.NavItem:focus {
  background-color: rgba(0, 79, 153, 0.492);
}
</style>


