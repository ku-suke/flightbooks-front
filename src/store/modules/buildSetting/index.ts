import { Module } from "vuex";
import { Rootstate } from "@/store";
import { mutations } from "@/store/modules/buildSetting/mutations";
import {
  IBuildSettingState,
  initialState
} from "@/store/modules/buildSetting/state";

export * from "@/store/modules/buildSetting/state";

export const store: Module<IBuildSettingState, Rootstate> = {
  state: initialState,
  mutations
};
