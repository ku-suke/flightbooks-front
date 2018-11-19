<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">ビルド設定</div>
    </div>
    <div class="content">
      <FormBlock label="ビルド環境">
        <select class="select" v-model="presenter.buildSetting.environment" :disabled="isLoading">
          <option disabled value="">Please select one</option>
          <option value="preview">著者確認（preview）</option>
          <option value="production">本番（production）</option>
        </select>
      </FormBlock>
      <FormBlock label="通知先メールアドレス">
        <Input v-model="presenter.buildSetting.email" placeholder="j.smith@example.com" :disabled="isLoading"/>
      </FormBlock>
      <FormBlock label="初版日">
        <Input v-model="presenter.buildSetting.createdAt" placeholder="yyyy/mm/dd" :disabled="isLoading"/>
      </FormBlock>
      <FormBlock label="ビルドバージョン">
        <Input v-model="presenter.buildSetting.version" placeholder="1.0" :disabled="isLoading"/>
      </FormBlock>
      <FormBlock label="印刷所">
        <Input v-model="presenter.buildSetting.printingOffice" placeholder="株式会社グラフィック" :disabled="isLoading"/>
      </FormBlock>
      <FormBlock>
        <Button text="ビルドする" @click="build" :loading="isLoading" :disabled="isLoading"/>
      </FormBlock>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import Presenter, { IPresenter } from "./presenter";

import FetchBuildSettingUseCase from "@/usecases/BuildSetting/FetchBuildSettingUseCase";
import SaveBuildSettingUseCase from "@/usecases/BuildSetting/SaveBuildSettingUseCase";
import CreateBuildJobUseCase from "@/usecases/BuildJob/CreateBuildJobUseCase";

import BuildSettingEntity, {
  IBuildSettingEnvironment
} from "@/entities/BuildSetting";

import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import UserRepository from "@/repositories/UserRepository";
import PageContentRepository from "@/repositories/PageContentRepository";

import BuildJobRepository from "@/repositories/BuildJobRepository";
import ErrorService from "@/services/ErrorService";

import Input from "@/components/Base/Input.vue";
import Select from "@/components/Base/Select.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import Button, {
  Type as ButtonType,
  Size as ButtonSize
} from "@/components/Base/Button.vue";
import BookEntity from "@/entities/Book";

interface IData {
  isLoading: boolean;
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
    },
    book: {
      type: BookEntity,
      required: true
    }
  },
  data(): IData {
    return {
      isLoading: false
    };
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        buildSettingRepository: new BuildSettingRepository(),
        userRepository: new UserRepository(),
        pageContentRepository: new PageContentRepository()
      });
    }
  },
  methods: {
    async fetchBuildSetting() {
      const usecase = new FetchBuildSettingUseCase({
        buildSettingRepository: new BuildSettingRepository(),
        errorService: new ErrorService({ context: "Saving BuildSetting" })
      });
      await usecase.execute(this.id);
    },
    async build() {
      this.isLoading = true;

      // BuildSettingを保存する
      const saveBuildSettingUseCase = new SaveBuildSettingUseCase({
        buildSettingRepository: new BuildSettingRepository(),
        errorService: new ErrorService({ context: "CreateBuildJob UseCase" })
      });

      const item = new BuildSettingEntity({
        ...this.presenter.buildSetting,
        identifier: this.id
      });
      await saveBuildSettingUseCase.execute(item);

      // Buildする
      const createBuildJobUseCase = new CreateBuildJobUseCase({
        buildJobRepository: new BuildJobRepository(),
        errorService: new ErrorService({ context: "CreateBuildJob UseCase" })
      });

      await createBuildJobUseCase.execute({
        owner: this.presenter.userId,
        bookEntity: this.book,
        bookId: this.id
      });

      this.isLoading = false;
      alert("ビルドキューを作成しました");
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

.select {
  box-sizing: border-box;
  font-size: 14px;
  min-height: 50px;
  padding: 10px 18px;
  line-height: 30px;
  color: #070707;
  background-color: #f6f6f6;
  outline: none;
  border: 1px solid #dadbe3;
  border-radius: 4px;
  transition: 0.3s;
  appearance: none;
}
</style>
