import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/user/mutations";
import { UserState, initialState } from "@/store/modules/user/state";

export * from "@/store/modules/user/state";

export const store: Module<UserState, Rootstate> = {
  state: initialState,
  mutations
};
