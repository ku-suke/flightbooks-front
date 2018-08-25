import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "./mutations";
import { UnregisteredMuseumState, initialState } from "./state";

export * from "./state";

export const store: Module<UnregisteredMuseumState, Rootstate> = {
  state: initialState,
  mutations
};
