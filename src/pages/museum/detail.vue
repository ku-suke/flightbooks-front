<template>
  <div class="Museum">
    <Container :identifier="$route.params.id"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/containers/museum/detail/index.vue";

export default Vue.extend({
  components: {
    Container
  }
});
</script>
