import { IBuildSetting } from "@/entities/BuildSetting";

export interface IBuildSettingState {
  data: IBuildSetting | null;
}

export const initialState = (): IBuildSettingState => ({
  data: null
});
