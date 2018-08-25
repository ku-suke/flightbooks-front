<template>
  <div class="Unregistered">
    <Container />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/containers/unregistered/index.vue";

export default Vue.extend({
  components: {
    Container
  }
});
</script>
