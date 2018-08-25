<template>
  <div class="MuseumList">
    <Container />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/containers/museum/list/index.vue";

export default Vue.extend({
  components: {
    Container
  }
});
</script>
