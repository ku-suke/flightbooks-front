import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/buildJob/mutations";
import { IBuildJobState, initialState } from "@/store/modules/buildJob/state";

export * from "@/store/modules/buildJob/state";

export const store: Module<IBuildJobState, Rootstate> = {
  state: initialState,
  mutations
};
