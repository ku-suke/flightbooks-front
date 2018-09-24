import { MutationTree } from "vuex";
import {
  IProjectTreeState,
  initialState
} from "@/store/modules/projectTree/state";
import { Types, StoreData } from "@/store/modules/projectTree/types";

export const mutations: MutationTree<IProjectTreeState> = {
  [Types.STORE_DATA]: (state, action: StoreData) => {
    const data = action.payload;
    state.data = data;
  },
  [Types.RESET_DATA]: state => {
    const { data } = initialState();
    state.data = data;
  }
};
