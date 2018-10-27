import { IBuildSetting } from "@/entities/BuildSetting";

export enum Types {
  STORE_DATA = "buildSetting/store_data",
  RESET_DATA = "buildSetting/reset_data"
}

export class StoreData implements FluxStandardAction {
  type = Types.STORE_DATA;
  constructor(public payload: IBuildSetting) {}
}

export class ResetData implements FluxStandardAction {
  type = Types.RESET_DATA;
  payload = null;
}
