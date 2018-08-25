<template>
  <div id="app" class="App">
    <el-container>
      <el-aside class="App__Sidebar" width="260px">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header class="App__Header">
          <Header :user="presenter.currentUser" @signOut="signOut"/>
        </el-header>
        <main>
          <router-view/>
        </main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import presenter, { IPresenter, IPresenterState } from "./presenter";
import Header from "@/containers/header/index.vue";
import Sidebar from '@/containers/Sidebar/index.vue'
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


<style scoped>
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

.App__Header {
  padding: 0;
  z-index: 10;
}

.App__Sidebar {
  width: 260px;
  height: 100%;
}
</style>
