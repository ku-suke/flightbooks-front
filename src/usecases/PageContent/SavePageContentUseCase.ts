import PageContentRepository from "@/repositories/PageContentRepository";
import PageContentEntity from "@/entities/PageContent";
import ErrorService from "@/services/ErrorService";

export interface ISavePageContentUseCase {
  pageContentRepository: PageContentRepository;
  errorService: ErrorService;
}

export default class SavePageContentUseCase implements UseCase {
  pageContentRepository: PageContentRepository;
  errorService: ErrorService;

  constructor({
    pageContentRepository,
    errorService
  }: ISavePageContentUseCase) {
    this.pageContentRepository = pageContentRepository;
    this.errorService = errorService;
  }

  async execute(item: PageContentEntity): Promise<void> {
    try {
      await this.pageContentRepository.save(item);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
