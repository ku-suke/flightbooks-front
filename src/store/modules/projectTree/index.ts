import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/projectTree/mutations";
import { IProjectTreeState, initialState } from "@/store/modules/projectTree/state";

export * from "@/store/modules/projectTree/state";

export const store: Module<IProjectTreeState, Rootstate> = {
  state: initialState,
  mutations
};
