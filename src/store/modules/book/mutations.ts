import { MutationTree } from "vuex";
import { IBookState, initialState } from "@/store/modules/book/state";
import { Types, StoreItems, StoreItem } from "@/store/modules/book/types";

export const mutations: MutationTree<IBookState> = {
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
