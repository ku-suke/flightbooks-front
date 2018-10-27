import firebase from "firebase";

export enum IBuildSettingEnvironment {
  PREVIEW = "preview",
  PRODUCTION = "production"
}

export interface IBuildSetting {
  identifier?: Identifier;
  environment: IBuildSettingEnvironment;
  email: string;
  createdAt: string;
  version: string;
  printingOffice: string;
}

export default class BuildSettingEntity {
  private _props: IBuildSetting;

  constructor(params: IBuildSetting) {
    this._props = {
      ...params
    };
  }

  get props() {
    return this._props;
  }
}
