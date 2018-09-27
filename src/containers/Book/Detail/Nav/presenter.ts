import UserRepository from "@/repositories/UserRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import PageContentRepository from "@/repositories/PageContentRepository";
import ProjectTreeEntity from "@/entities/ProjectTree";

export interface PresenterParams {
  userRepository: UserRepository;
  projectTreeRepository: ProjectTreeRepository;
  pageContentRepository: PageContentRepository;
}

export interface IPresenter {
  userId: string;
  projectTree: ProjectTreeEntity;
  currentPage: string | null;
}

export default ({
  userRepository,
  projectTreeRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  const pageContent = pageContentRepository.getItem();
  return {
    userId: currentUser ? currentUser.uid : "",
    projectTree: projectTreeRepository.getData(),
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
