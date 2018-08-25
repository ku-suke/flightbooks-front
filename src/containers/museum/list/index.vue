<template>
  <div class="MuseumList">
    <div class="MuseumList__Header">
      <SectionHeader text="Registered Museums" />
    </div>
    <div class="MuseumList__Table">
      <el-table stripe empty-text="Loading Data..." :data="presenter.items" @row-click="handleRawClick">
        <el-table-column prop="identifier" label="ID" sortable />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="address" />
        <el-table-column prop="updatedAt" label="Updated At" sortable />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import presenter, {
  IPresenter,
  IPresenterState,
  IDisplayMuseum
} from "./presenter";
import LoadContainerUseCase, {
  ILoadContainerUseCase
} from "./LoadContainerUseCase";
import DestroyContainerUseCase, {
  IDestroyContainerUseCase
} from "./DestroyContainerUseCase";
import MuseumRepository from "@/repositories/MuseumRepository";
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
        museumRepository: new MuseumRepository()
      };

      const state = presenter(params);
      return state;
    }
  },
  methods: {
    handleRawClick(row: IDisplayMuseum) {
      this.$router.push(`/museums/${row.identifier}`);
    }
  },
  async mounted() {
    const params: ILoadContainerUseCase = {
      museumRepository: new MuseumRepository(),
      errorService: new ErrorService({
        context: "mounting museums list page"
      })
    };

    await new LoadContainerUseCase(params).execute();
  },
  async destroyed() {
    const params: IDestroyContainerUseCase = {
      museumRepository: new MuseumRepository()
    };

    await new DestroyContainerUseCase(params).execute();
  }
});
</script>
