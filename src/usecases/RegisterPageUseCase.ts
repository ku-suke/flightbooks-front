import ErrorService from "@/services/ErrorService";
import PageContentEntity from '@/entities/PageContent'
import ProjectTreeEntity from "@/entities/ProjectTree";
import PageContentRepository from '@/repositories/PageContentRepository'
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";

export interface IRegisterPageUseCase {
  projectTreeEntity: ProjectTreeEntity;
  pageContentRepository: PageContentRepository
  projectTreeRepository: ProjectTreeRepository;
  errorService: ErrorService;
}

export default class RegisterPageUseCase implements UseCase {
  projectTreeEntity: ProjectTreeEntity;
  pageContentRepository: PageContentRepository
  projectTreeRepository: ProjectTreeRepository;
  errorService: ErrorService;

  constructor({
    projectTreeEntity,
    pageContentRepository,
    projectTreeRepository,
    errorService
  }: IRegisterPageUseCase) {
    this.projectTreeEntity = projectTreeEntity;
    this.pageContentRepository = pageContentRepository
    this.projectTreeRepository = projectTreeRepository;
    this.errorService = errorService;
  }

  async execute({
    name,
    parentId
  }: {
    name: string;
    parentId: string;
  }): Promise<void> {
    try {
      // Register New Page Content
      const owner = this.projectTreeEntity.props.owner
      const pageContentEntity = PageContentEntity.newEntity(owner)
      const pageContentRef = await this.pageContentRepository.create(pageContentEntity)

      // Register to ProjectTree
      this.projectTreeEntity.registerPage({ name, pageContentRef , parentId });
      this.projectTreeRepository.save(this.projectTreeEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
