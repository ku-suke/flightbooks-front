<template>
  <main class="BuildSetting">
    <BuildSettingContainer :id="$route.params.id" />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import BuildSettingContainer from "@/containers/BuildSetting/index.vue";

export default Vue.extend({
  name: "build",
  components: {
    BuildSettingContainer
  }
});
</script>

<style scoped>
.BuildSetting {
  padding: 0;
}
</style>
