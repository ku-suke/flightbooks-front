<template>
  <div class="Signin">
    <el-card class="Signin__Card">
      <div slot="header" class="clearfix">
        <span>Sign In</span>
      </div>
      <div class="Signin__Form">
        <el-form @submit.native.prevent="signin">
          <el-form-item label="Email">
            <el-input v-model="email" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :disabled="!verified" round>Signin</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";

export default Vue.extend({
  name: "Signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    verified(): boolean {
      return this.email.length > 0 && this.password.length > 0;
    }
  },
  methods: {
    signin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Success!");
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
    }
  }
});
</script>

<style scoped>
.Signin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
}

.Signin__Card {
  width: 400px;
}
</style>
