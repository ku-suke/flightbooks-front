import BuildJobRepository from "@/repositories/BuildJobRepository";
import { buildJobEntityFactory } from "@/entities/BuildJob";
import ErrorService from "@/services/ErrorService";
import ProjectTreeEntity from "@/entities/ProjectTree";

export interface ICreateBuildJobUseCase {
  buildJobRepository: BuildJobRepository;
  errorService: ErrorService;
}

export default class CreateBuildJobUseCase implements UseCase {
  buildJobRepository: BuildJobRepository;
  errorService: ErrorService;

  constructor({ buildJobRepository, errorService }: ICreateBuildJobUseCase) {
    this.buildJobRepository = buildJobRepository;
    this.errorService = errorService;
  }

  async execute({
    owner,
    projectTreeEntity,
    bookId
  }: {
    owner: string;
    projectTreeEntity: ProjectTreeEntity;
    bookId: string;
  }): Promise<void> {
    try {
      // Get pageRefs
      const pageIds = projectTreeEntity.getAllPages();

      // Register New Buildjob
      const buildJobEntity = buildJobEntityFactory({
        bookId,
        owner,
        pageIds
      });
      await this.buildJobRepository.create(buildJobEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
