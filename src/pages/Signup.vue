<template>
  <main class="Signup">
    <el-card class="Signup__Card">
      <div slot="header" class="clearfix">
        <span>アカウント登録</span>
      </div>
      <div class="Signup__Body">
        <template v-if="isEmailSent">
          ユーザーの仮登録に成功しました。<br>
          送信された認証メール内のリンクをクリックし、登録を完了してください。<br>
          <a href="/">ページトップへ</a>
        </template>
        <template v-else>
          <form class="Signup__Form" @submit.prevent="signup">
            <FormBlock label="メールアドレス">
              <Input v-model="email" placeholder="j.smith@example.com" />
            </FormBlock>
            <FormBlock label="パスワード">
              <Input v-model="password" type="password" />
            </FormBlock>
            <Button text="登録" nativeType="submit" :type="ButtonType.Primary" :disabled="!verified" :loading="loading" />
          </form>
        </template>
      </div>
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
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      ButtonType,
      ButtonSize,
      loading: false,
      isEmailSent: false
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
    async signup() {
      if (!this.verified) {
        alert("不正なリクエストです。");
        this.loading = false;
        return;
      }
      this.loading = true;

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        user.user.sendEmailVerification();
        this.isEmailSent = true;
      } catch (error) {
        const code = error.code || "";
        if (code === Error.ALREADY_INUSE) {
          alert("メールアドレスはすでに登録されています。");
        } else if (code === Error.WEAK_PASSWORD) {
          alert("パスワードの強度が不十分です。");
        } else if (code === Error.INVALID_EMAIL) {
          alert("メールアドレスが正しくありません。");
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
.Signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
}

.Signup__Card {
  width: 400px;
}

.Signup__Form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
