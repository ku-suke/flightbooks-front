<template>
  <main class="BookSetting">
    <BookSettingContainer :id="$route.params.id" />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import BookSettingContainer from "@/containers/BookSetting/index.vue";

export default Vue.extend({
  name: "build",
  components: {
    BookSettingContainer
  }
});
</script>

<style scoped>
.BookSetting {
  padding: 0;
}
</style>
