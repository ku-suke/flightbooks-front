import PageContentRepository from "@/repositories/PageContentRepository";
import BookRepository from "@/repositories/BookRepository";
import PageContentEntity from "@/entities/PageContent";
import ErrorService from "@/services/ErrorService";
import BookEntity from "@/entities/Book";

export interface ISavePageContentUseCase {
  pageContentRepository: PageContentRepository;
  bookRepository: BookRepository;
  errorService: ErrorService;
}

export default class SavePageContentUseCase implements UseCase {
  pageContentRepository: PageContentRepository;
  bookRepository: BookRepository;
  errorService: ErrorService;

  constructor({
    pageContentRepository,
    bookRepository,
    errorService
  }: ISavePageContentUseCase) {
    this.bookRepository = bookRepository;
    this.pageContentRepository = pageContentRepository;
    this.errorService = errorService;
  }

  async execute({
    pageContentEntity,
    book
  }: {
    pageContentEntity: PageContentEntity;
    book: BookEntity;
  }): Promise<void> {
    try {
      await this.pageContentRepository.save(pageContentEntity);
      // ページリストの該当コンテンツをアップデート
      book.updatePage({ pageContentEntity });
      await this.bookRepository.save(book);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
