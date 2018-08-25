import { MutationTree } from "vuex";
import { MuseumState, initialState } from "@/store/modules/museum/state";
import { Types, StoreItems, StoreItem } from "@/store/modules/museum/types";

export const mutations: MutationTree<MuseumState> = {
  [Types.STORE_ITEMS]: (state, action: StoreItems) => {
    const items = action.payload;
    state.items = items;
  },
  [Types.RESET_ITEMS]: state => {
    const { items } = initialState();
    state.items = items;
  },
  [Types.STORE_ITEM]: (state, action: StoreItem) => {
    const item = action.payload;
    state.item = item;
  },
  [Types.RESET_ITEM]: state => {
    const { item } = initialState();
    state.item = item;
  }
};
