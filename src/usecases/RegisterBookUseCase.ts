import BookRepository from "@/repositories/BookRepository";
import BookEntity from "@/entities/Book";
import ErrorService from "@/services/ErrorService";

export interface IRegisterBookUseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;
}

export default class RegisterBookUseCase implements UseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;

  constructor({ bookRepository, errorService }: IRegisterBookUseCase) {
    this.bookRepository = bookRepository;
    this.errorService = errorService;
  }

  async execute({
    name,
    owner
  }: {
    name: string;
    owner: string;
  }): Promise<void> {
    try {
      // Register New Book
      const bookEntity = BookEntity.newEntity({ name, owner });
      await this.bookRepository.create(bookEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
