import firebase from "firebase";

export interface IBuildSetting {
  identifier?: Identifier;
  isProduction: boolean;
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
