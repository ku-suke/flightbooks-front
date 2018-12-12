import ErrorService from "@/services/ErrorService";
import BookEntity from "@/entities/Book";
import BookRepository from "@/repositories/BookRepository";

export interface IDeletePageUseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;
}

export default class DeletePageUseCase implements UseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;

  constructor({ bookRepository, errorService }: IDeletePageUseCase) {
    this.bookRepository = bookRepository;
    this.errorService = errorService;
  }

  async execute({
    bookEntity,
    identifier
  }: {
    bookEntity: BookEntity;
    identifier: string;
  }): Promise<void> {
    try {
      // Register to Book
      bookEntity.deletePage({ identifier });
      this.bookRepository.save(bookEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
