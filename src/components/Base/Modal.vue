<template>
  <transition name="modal">
    <div class="Modal__Wrapper">
      <div class="Modal__Mask" @click="handleClose"/>
      <div class="Modal__Container">
        <div class="Modal__Header">
          <slot name="header"/>
        </div>

        <div class="Modal__Body">
          <slot name="body"/>
        </div>

        <div class="Modal__Footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>


<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
});
</script>

<style scoped lang="postcss">
.Modal__Mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}
.Modal__Container {
  position: fixed;
  z-index: 101;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 480px;
  transition: all 0.3s ease;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.Modal__Header {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
.Modal__Body {
  padding: 0 calc(8px * 6);
}
.Modal__Footer {
  display: flex;
  justify-content: space-around;
  padding: 0 calc(8px * 3) calc(8px * 6);
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .5s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
