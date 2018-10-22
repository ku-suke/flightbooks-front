import { MutationTree } from "vuex";
import {
  IBuildSettingState,
  initialState
} from "@/store/modules/buildSetting/state";
import { Types, StoreData } from "@/store/modules/buildSetting/types";

export const mutations: MutationTree<IBuildSettingState> = {
  [Types.STORE_DATA]: (state, action: StoreData) => {
    const data = action.payload;
    state.data = data;
  },
  [Types.RESET_DATA]: state => {
    const { data } = initialState();
    state.data = data;
  }
};
