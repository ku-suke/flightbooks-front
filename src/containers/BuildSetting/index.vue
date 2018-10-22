<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">ビルド設定</div>
    </div>
    <div class="content">
      <FormBlock label="ビルド環境">
        <input type="checkbox" v-model="presenter.buildSetting.enviroment" />
      </FormBlock>
      <FormBlock label="メールアドレス">
        <Input v-model="presenter.buildSetting.email" placeholder="j.smith@example.com" />
      </FormBlock>
      <FormBlock label="初版日">
        <Input v-model="presenter.buildSetting.createdAt" placeholder="yyyy/mm/dd" />
      </FormBlock>
      <FormBlock label="ビルドバージョン">
        <Input v-model="presenter.buildSetting.version" placeholder="1.0" />
      </FormBlock>
      <FormBlock label="印刷所">
        <Input v-model="presenter.buildSetting.printingOffice" placeholder="株式会社グラフィック" />
      </FormBlock>
      <FormBlock>
        <Button text="ビルドする"/>
      </FormBlock>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Presenter, { IPresenter } from "./presenter";

import FetchBuildSettingUseCase from "@/usecases/BuildSetting/FetchBuildSettingUseCase";

import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import ErrorService from "@/services/ErrorService";

import Input from "@/components/Base/Input.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import Button, {
  Type as ButtonType,
  Size as ButtonSize
} from "@/components/Base/Button.vue";

interface IData {
  enviroment: boolean;
  email: string;
  createdAt: string;
  version: string;
  printingOffice: string;
}

export default Vue.extend({
  components: {
    FormBlock,
    Input,
    Button
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(): IData {
    return {
      enviroment: false,
      email: null,
      createdAt: null,
      version: null,
      printingOffice: null
    };
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        buildSettingRepository: new BuildSettingRepository()
      });
    }
  },
  methods: {
    async fetchBuildSetting() {
      const usecase = new FetchBuildSettingUseCase({
        buildSettingRepository: new BuildSettingRepository(),
        errorService: new ErrorService({ context: "Fetching BuildSetting" })
      });
      await usecase.execute(this.id);
    }
  },
  async mounted() {
    await this.fetchBuildSetting();
  }
});
</script>

<style scoped>
.title {
  padding: 24px;
  font-size: 24px;
}

.content {
  width: 640px;
  margin: 0 auto;
}
</style>
