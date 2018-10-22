import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import { IBuildSetting } from "@/entities/BuildSetting";

export interface PresenterParams {
  buildSettingRepository: BuildSettingRepository;
}

export interface IPresenter {
  buildSetting: IBuildSetting;
}

export default ({ buildSettingRepository }: PresenterParams): IPresenter => {
  return {
    buildSetting: buildSettingRepository.getData().props
  };
};
