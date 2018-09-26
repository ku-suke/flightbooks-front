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
import firebase, { User } from "firebase";
import { Error } from "@/middleware/firebase_middleware";
import Input from "@/components/Base/Input.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import Button, {
  Type as ButtonType,
  Size as ButtonSize
} from "@/components/Base/Button.vue";
import { Rootstate } from "@/store";

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
    },
    state(): Rootstate {
      return this.$store.state;
    },
    currentUser(): User | null {
      return this.state.user.user;
    }
  },
  watch: {
    currentUser: {
      immediate: true,
      handler(newVal, _) {
        if (newVal) this.redirect();
      }
    }
  },
  methods: {
    async signin() {
      if (!this.verified) {
        alert("不正なリクエストです。");
        this.loading = false;
        return;
      }

      this.loading = true;

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        if (!user.user.emailVerified) {
          alert("メール認証が完了していません。受信箱を確認してください。");
          firebase.auth().signOut();
        } else {
          this.redirect();
        }
      } catch (error) {
        const code = error.code || "";
        if (code === Error.WRONG_PASSWORD) {
          alert("パスワードが正しくありません。");
        } else if (code === Error.INVALID_EMAIL) {
          alert("メールアドレスが正しくありません。");
        } else if (code === Error.USER_NOT_FOUND) {
          alert("存在しないユーザーです。");
        } else {
          alert(
            "登録時にエラーが発生しました。もう一度情報を入力してください。"
          );
        }
      }

      this.loading = false;
    },
    redirect() {
      const redirect = this.$route.query.redirect;
      if (redirect) {
        this.$router.push(redirect);
      } else {
        this.$router.push("/");
      }
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
