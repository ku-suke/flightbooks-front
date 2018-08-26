<template>
  <main class="Home">
    <BookListContainer />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import BookListContainer from '@/containers/Book/List/index.vue'

export default Vue.extend({
  name: "home",
  components: {
    BookListContainer
  }
});
</script>
