<template>
  <div class="Unregistered">
    <div class="Unregistered__Header">
      <SectionHeader text="Unregistered Museums" />
    </div>
    <div class="Unregistered__Table">
      <el-table stripe empty-text="Loading Data..." :data="presenter.museums">
        <el-table-column prop="identifier" label="ID" sortable />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="source" label="Source" />
        <el-table-column prop="createdAt" label="Created At" sortable />
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button type="text" size="small">Register</el-button>
            <el-button type="text" size="small">Merge</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import presenter, { IPresenter, IPresenterState } from "./presenter";
import LoadContainerUseCase, {
  ILoadContainerUseCase
} from "./LoadContainerUseCase";
import DestroyContainerUseCase, {
  IDestroyContainerUseCase
} from "./DestroyContainerUseCase";
import RegisterMuseumUseCase, { IRegisterMuseumUseCase } from "@/usecases/RegisterMuseumUseCase"
import UnregisteredMuseumRepository from "@/repositories/UnregisteredMuseumRepository";
import ErrorService from "@/services/ErrorService";

// components
import SectionHeader from "@/components/Base/SectionHeader.vue";

export default Vue.extend({
  components: {
    SectionHeader
  },
  computed: {
    presenter(): IPresenterState {
      const params: IPresenter = {
        unregisteredMuseumRepository: new UnregisteredMuseumRepository()
      };

      const state = presenter(params);
      return state;
    }
  },
  async mounted() {
    const params: ILoadContainerUseCase = {
      unregisteredMuseumRepository: new UnregisteredMuseumRepository(),
      errorService: new ErrorService({
        context: "mounting museums list page"
      })
    };

    await new LoadContainerUseCase(params).execute();
  },
  async destroyed() {
    const params: IDestroyContainerUseCase = {
      unregisteredMuseumRepository: new UnregisteredMuseumRepository()
    };

    await new DestroyContainerUseCase(params).execute();
  }
});
</script>
