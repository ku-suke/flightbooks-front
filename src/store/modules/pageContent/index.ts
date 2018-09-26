import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/pageContent/mutations";
import {
  IPageContentState,
  initialState
} from "@/store/modules/pageContent/state";

export * from "@/store/modules/pageContent/state";

export const store: Module<IPageContentState, Rootstate> = {
  state: initialState,
  mutations
};
