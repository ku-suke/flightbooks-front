<template>
  <div class="Header">
    <div class="Hedaer__Left">
      <router-link class="Header__Logo" to="/">
        <img src="/logo.png" />
      </router-link>
      <small>💥まだ作りたてのアルファバージョンです。🛠<br >不具合報告は<a href="https://twitter.com/ku_suke">@ku_suke</a> または<a href="https://github.com/ku-suke/flightbooks-front/issues">GitHub Issue</a>までお願いいたします。</small>
    </div>
    <div class="Header__Right">
        <!-- <el-button round @click="handleSignOut">Sign Out</el-button> -->
      <div class="Header__Actions">
        <template v-if="user">
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              {{ user.email }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu class="Header__DropdownMenu" slot="dropdown">
              <el-dropdown-item>設定</el-dropdown-item>
              <el-dropdown-item>支払い</el-dropdown-item>
              <el-dropdown-item>通知</el-dropdown-item>
              <el-dropdown-item disabled>Pro</el-dropdown-item>
              <el-dropdown-item divided>
                <el-button type="text" @click="handleSignOut">ログアウト</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          {{ user }}
          <el-button round :loading="isAuthenticating" @click="$router.push('/signin')">Sign In</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "firebase";

export default Vue.extend({
  props: {
    user: {
      type: Object as () => User,
      default: null
    },
    isAuthenticating: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSignOut() {
      console.log("handleSignOut called");
      this.$emit("signOut");
    }
  }
});
</script>

<style scoped>
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  height: 100%;
  background-color: #004f99;
  color: #fff;
}

.Hedaer__Left {
  display: flex;
  align-items: flex-end;
}

.Hedaer__Left small {
  text-align: left;
  height: 50px;
}

.Hedaer__Left small a,
.Hedaer__Left small a:visited,
.Hedaer__Left small a:active {
  color: white;
}

.Header__Logo {
  width: 150px;
}

.Header__Logo:hover > img {
  opacity: 0.6;
}

.Header__Logo > img {
  width: 100%;
  transition: 0.3s;
}

.Header__Nav > a {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
  margin-right: 16px;
}

.Header__Nav > a:hover {
  text-decoration: underline;
}

.Header__Actions {
  color: #fff;
}

.el-dropdown-link {
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.Header__DropdownMenu {
  min-width: 100px;
}
</style>
