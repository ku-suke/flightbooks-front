<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Admin App"
    };
  }
};
</script>

<style scoped>
/* 省略 */
</style>
