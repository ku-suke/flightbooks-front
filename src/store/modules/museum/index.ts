import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/museum/mutations";
import { MuseumState, initialState } from "@/store/modules/museum/state";

export * from "@/store/modules/museum/state";

export const store: Module<MuseumState, Rootstate> = {
  state: initialState,
  mutations
};
