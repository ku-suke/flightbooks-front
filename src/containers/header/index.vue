<template>
  <div class="Header">
    <div class="Hedaer__Left">
    </div>
    <div class="Header__Right">
      <div class="Header__Actions">
        <template v-if="user">
          <el-button round @click="handleSignOut">Sign Out</el-button>
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
  padding: 0 10%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  background-color: #e4002b;
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
</style>
