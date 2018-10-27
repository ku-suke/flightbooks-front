import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import { IBuildSetting } from "@/entities/BuildSetting";
import UserRepository from "@/repositories/UserRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import PageContentRepository from "@/repositories/PageContentRepository";
import ProjectTreeEntity from "@/entities/ProjectTree";

export interface PresenterParams {
  buildSettingRepository: BuildSettingRepository;
  userRepository: UserRepository;
  projectTreeRepository: ProjectTreeRepository;
  pageContentRepository: PageContentRepository;
}

export interface IPresenter {
  buildSetting: IBuildSetting;
  userId: string;
  projectTree: ProjectTreeEntity;
  currentPage: string | null;
}

export default ({
  buildSettingRepository,
  userRepository,
  projectTreeRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  const pageContent = pageContentRepository.getItem();
  return {
    buildSetting: buildSettingRepository.getData().props,
    userId: currentUser ? currentUser.uid : "",
    projectTree: projectTreeRepository.getData(),
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
