import BuildJobRepository from "@/repositories/BuildJobRepository";
import { buildJobEntityFactory } from "@/entities/BuildJob";
import ErrorService from "@/services/ErrorService";

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
    bookId
  }: {
    owner: string;
    bookId: string;
  }): Promise<void> {
    try {
      // Register New Buildjob
      const buildJobEntity = buildJobEntityFactory({
        bookId,
        owner
      });
      await this.buildJobRepository.create(buildJobEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
