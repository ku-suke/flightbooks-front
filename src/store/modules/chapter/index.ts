import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/chapter/mutations";
import { IChapterState, initialState } from "@/store/modules/chapter/state";

export * from "@/store/modules/chapter/state";

export const store: Module<IChapterState, Rootstate> = {
  state: initialState,
  mutations
};
