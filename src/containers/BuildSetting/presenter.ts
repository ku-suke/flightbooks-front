import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import { IBuildSetting } from "@/entities/BuildSetting";
import UserRepository from "@/repositories/UserRepository";
import PageContentRepository from "@/repositories/PageContentRepository";

export interface PresenterParams {
  buildSettingRepository: BuildSettingRepository;
  userRepository: UserRepository;
  pageContentRepository: PageContentRepository;
}

export interface IPresenter {
  buildSetting: IBuildSetting;
  userId: string;
  currentPage: string | null;
}

export default ({
  buildSettingRepository,
  userRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  const pageContent = pageContentRepository.getItem();
  return {
    buildSetting: buildSettingRepository.getData().props,
    userId: currentUser ? currentUser.uid : "",
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
