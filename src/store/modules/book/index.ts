import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/book/mutations";
import { IBookState, initialState } from "@/store/modules/book/state";

export * from "@/store/modules/book/state";

export const store: Module<IBookState, Rootstate> = {
  state: initialState,
  mutations
};
