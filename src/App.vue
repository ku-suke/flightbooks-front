<template>
  <div id="app" class="App">
    <el-container class="App__Container">
      <el-header class="App__Header" height="64px">
        <Header :user="presenter.currentUser" :isAuthenticating="presenter.isAuthenticating" @signOut="signOut"/>
      </el-header>
      <el-container>
        <template v-if="presenter.isAuthenticating">
          <h2>読み込み中だお</h2>
        </template>
        <router-view v-else/>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import presenter, { IPresenter, IPresenterState } from "./presenter";
import Header from "@/containers/Header/index.vue";
import Sidebar from "@/containers/Sidebar/index.vue";
import UserRepository from "@/repositories/UserRepository";

export default Vue.extend({
  components: {
    Header,
    Sidebar
  },
  computed: {
    presenter(): IPresenterState {
      const params: IPresenter = {
        userRepository: new UserRepository()
      };

      const state = presenter(params);
      return state;
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        });
    }
  }
});
</script>


<style>
body {
  margin: 0;
}

main {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10%;
}

#app {
  font-family: "MetSans", "Helvetica Neue", "Avenir", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.App__Container {
  min-height: 100vh;
}

.App__Header {
  padding: 0;
  z-index: 10;
}

.App__Sidebar {
  min-height: 100vh;
  height: 100%;
}
</style>
