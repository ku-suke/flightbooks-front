import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import PageContentRepository from "@/repositories/PageContentRepository";
import ProjectTreeEntity from "@/entities/ProjectTree";

export interface PresenterParams {
  projectTreeRepository: ProjectTreeRepository;
  pageContentRepository: PageContentRepository;
}

export interface IPresenter {
  projectTree: ProjectTreeEntity;
  currentPage: string | null;
}

export default ({
  projectTreeRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const pageContent = pageContentRepository.getItem();
  return {
    projectTree: projectTreeRepository.getData(),
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
