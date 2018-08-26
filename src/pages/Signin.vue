<template>
  <main class="Signin">
    <el-card class="Signin__Card">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>
      <form class="Signin__Form" @submit.prevent="signin">
        <FormBlock label="メールアドレス">
          <Input v-model="email" placeholder="j.smith@example.com" />
        </FormBlock>
        <FormBlock label="パスワード">
          <Input v-model="password" type="password" />
        </FormBlock>
        <Button text="ログイン" nativeType="submit" :type="ButtonType.Primary" :disabled="!verified" :loading="loading" />
      </form>
    </el-card>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import Input from '@/components/Base/Input.vue'
import FormBlock from '@/components/Base/FormBlock.vue'
import Button, { Type as ButtonType, Size as ButtonSize } from '@/components/Base/Button.vue'

export default Vue.extend({
  components: {
    Button,
    Input,
    FormBlock
  },
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      ButtonType,
      ButtonSize,
      loading: false
    };
  },
  computed: {
    verified(): boolean {
      return this.email.length > 0 && this.password.length > 0 && !this.loading;
    }
  },
  methods: {
    async signin() {
      this.loading = true
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

.Signin__Form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
