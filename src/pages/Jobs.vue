<template>
  <main class="Project">
    <JobListContainer />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import JobListContainer from "@/containers/Job/List/index.vue";

export default Vue.extend({
  name: "project",
  components: {
    JobListContainer
  }
});
</script>

<style scoped>
.Project {
  padding: 0;
}
</style>
