import { MutationTree } from "vuex";
import {
  IPageContentState,
  initialState
} from "@/store/modules/pageContent/state";
import { Types, AddItem, StoreItem } from "@/store/modules/pageContent/types";

export const mutations: MutationTree<IPageContentState> = {
  [Types.ADD_ITEM]: (state, action: AddItem) => {
    const item = action.payload;
    state.items = {
      ...state.items,
      [item.identifier]: item
    };
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
