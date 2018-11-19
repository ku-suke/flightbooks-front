import PageContentRepository from "@/repositories/PageContentRepository";
import ErrorService from "@/services/ErrorService";
import PageEntity from "@/entities/Page";

export interface ISelectPageUseCase {
  pagecontentRepository: PageContentRepository;
  errorService: ErrorService;
}

export default class SelectPageUseCase implements UseCase {
  pagecontentRepository: PageContentRepository;
  errorService: ErrorService;

  constructor({ pagecontentRepository, errorService }: ISelectPageUseCase) {
    this.pagecontentRepository = pagecontentRepository;
    this.errorService = errorService;
  }

  async execute(pageEntity: PageEntity): Promise<void> {
    // Bookから指定されたPageEntityを使って、PageContentを取得する
    try {
      const identifier = pageEntity.props.identifier;
      const pageContent = await this.pagecontentRepository.fetchItemById(
        identifier
      );
      // @TODO この2つの違いが判らない。Addはmutationsでstate.itemsに追加している
      this.pagecontentRepository.addItem(pageContent);
      this.pagecontentRepository.storeItem(pageContent);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
