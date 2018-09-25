<template>
  <div class="JobsList">
    <div class="JobsList__Header">
      <div class="JobsList__Title">ビルド一覧</div>
    </div>
    <div class="JobsList__Body">
      <div class="JobsList__Projects">
      </div>
    </div>
    <Modal v-show="showModal" @close="showModal = false">
      <div slot="header">
        <h2>詳細情報</h2>
      </div>
      <template slot="body">
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Presenter, { IPresenter } from "./presenter";

import { IBook } from "@/entities/Book";
import UserRepository from "@/repositories/UserRepository";
import ErrorService from "@/services/ErrorService";

// Use Case
import FetchBuildJobListUseCase from '@/usecases/FetchBuildJobListUseCase'

// Repositories
import BuildJobRepository from '@/repositories/BuildJobRepository'

// components
import Modal from "@/components/Base/Modal.vue";

interface IData {
  showModal: boolean;
}

export default Vue.extend({
  components: {
    Modal,
  },
  data(): IData {
    return {
      showModal: false,
    };
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        buildJobRepository: new BuildJobRepository(),
        userRepository: new UserRepository()
      });
    }
  },
  methods: {
    async fetchBuildJobList() {
      const usecase = new FetchBuildJobListUseCase({
        buildJobRepository: new BuildJobRepository(),
        errorService: new ErrorService({ context: 'Fetching BuildJob' })
      })
      await usecase.execute(this.presenter.userId)
    }
  },
  async mounted() {
    await this.fetchBuildJobList();
  },
});
</script>

<style scoped>
</style>
