<template>
  <div class="Header">
    <div class="Hedaer__Left">
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
      default: null,
    },
    isAuthenticating: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSignOut() {
      console.log('handleSignOut called')
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
  background-color: #070707;
  color: #fff;
}

.Hedaer__Left {
  display: flex;
  align-items: flex-end;
}

.Header__Logo {
  font-size: 32px;
  font-weight: bold;
  margin-right: 32px;
  line-height: 1;
}

.Header__Logo > a {
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

.Header__Logo > a:hover {
  color: #262626;
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
