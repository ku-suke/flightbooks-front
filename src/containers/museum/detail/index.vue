
<template>
  <div class="MuseumDetail">
    <div class="MuseumDetail__Form">
      <template v-if="presenter.item">
        <el-form ref="form" :model="form" @submit.native.prevent="update">
          <el-form-item label="Museum name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item label="Entry">
            <el-input type="textarea" v-model="form.entry" :rows="4" />
          </el-form-item>
          <el-form-item label="Image">
            <el-input v-model="form.img" />
          </el-form-item>
          <el-form-item label="Latitude">
            <el-input-number v-model="form.lat" :controls="false" />
          </el-form-item>
          <el-form-item label="Longitude">
            <el-input-number v-model="form.lng" :controls="false" />
          </el-form-item>
          <el-form-item label="Site URL">
            <el-input v-model="form.siteUrl" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" round :loading="updating">Update</el-button>
          </el-form-item>
        </el-form>
      </template>
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
import UpdateMuseumUseCase, {
  IUpdateMuseumUseCase
} from "./UpdateMuseumUseCase";
import MuseumRepository from "@/repositories/MuseumRepository";
import ErrorService from "@/services/ErrorService";

export default Vue.extend({
  data() {
    return {
      form: {
        name: "",
        address: "",
        entry: "",
        img: "",
        lat: 0,
        lng: 0,
        siteUrl: ""
      },
      updating: false
    };
  },
  props: {
    identifier: {
      type: String,
      required: true
    }
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
  watch: {
    presenter: {
      handler: function(val: IPresenterState, oldVal: IPresenterState) {
        if (oldVal.item != null || val.item == null) return; // only when the value is set

        const { name, address, entry, img, lat, lng, siteUrl} = val.item;
        this.form = {
          ...this.form,
          name,
          address,
          entry,
          img,
          lat,
          lng,
          siteUrl
        };
      },
      deep: true
    }
  },
  methods: {
    async update() {
      this.updating = true;

      const params: IUpdateMuseumUseCase = {
        museumRepository: new MuseumRepository(),
        errorService: new ErrorService({
          context: "updating museum"
        }),
        identifier: this.identifier
      };

      await new UpdateMuseumUseCase(params).execute(this.form);
      this.$router.push("/museums");
    }
  },
  async mounted() {
    const params: ILoadContainerUseCase = {
      museumRepository: new MuseumRepository(),
      errorService: new ErrorService({
        context: "mounting museum detail page"
      }),
      identifier: this.identifier
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
