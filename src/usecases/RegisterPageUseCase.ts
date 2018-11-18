import ErrorService from "@/services/ErrorService";
import PageContentEntity from "@/entities/PageContent";
import BookEntity from "@/entities/Book";
import PageContentRepository from "@/repositories/PageContentRepository";
import BookRepository from "@/repositories/BookRepository";

export interface IRegisterPageUseCase {
  pageContentRepository: PageContentRepository;
  bookRepository: BookRepository;
  errorService: ErrorService;
}

export default class RegisterPageUseCase implements UseCase {
  pageContentRepository: PageContentRepository;
  bookRepository: BookRepository;
  errorService: ErrorService;

  constructor({
    pageContentRepository,
    bookRepository,
    errorService
  }: IRegisterPageUseCase) {
    this.pageContentRepository = pageContentRepository;
    this.bookRepository = bookRepository;
    this.errorService = errorService;
  }

  async execute({
    content,
    bookEntity
  }: {
    content: string;
    bookEntity: BookEntity;
  }): Promise<void> {
    try {
      // Register New Page Content
      // FirebaseにはPageContentを、Bookにはその一部メタデータを保存
      const owner = bookEntity.props.owner;
      const pageContentEntity = PageContentEntity.newEntity(owner);
      pageContentEntity.updateContent(content);
      const pageContentRef = await this.pageContentRepository.create(
        pageContentEntity
      );

      // Register to Book
      bookEntity.registerPage({ pageContentEntity });
      this.bookRepository.save(bookEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
