import { MutationTree } from "vuex";
import { UnregisteredMuseumState, initialState } from "./state";
import { Types, StoreMuseums } from "./types";

export const mutations: MutationTree<UnregisteredMuseumState> = {
  [Types.STORE_MUSEUMS]: (state, action: StoreMuseums) => {
    const items = action.payload;
    state.items = items;
  },
  [Types.RESET_MUSEUMS]: state => {
    const { items } = initialState();
    state.items = items;
  }
};
