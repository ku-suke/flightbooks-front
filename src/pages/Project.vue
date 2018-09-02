<template>
  <main class="Project">
    <BookDetailContainer />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import BookDetailContainer from '@/containers/Book/Detail/index.vue'

export default Vue.extend({
  name: "project",
  components: {
    BookDetailContainer
  }
});
</script>

<style scoped>
.Project {
  padding: 0;
}
</style>
