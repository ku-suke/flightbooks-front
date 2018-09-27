import BaseUseCase from "@/usecases/BaseUseCase";
import BookRepository from "@/repositories/BookRepository";
import ErrorService from "@/services/ErrorService";

export interface IFetchBookUseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;
}

export default class FetchBookUseCase implements BaseUseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;

  constructor({ bookRepository, errorService }: IFetchBookUseCase) {
    this.bookRepository = bookRepository;
    this.errorService = errorService;
  }

  async execute(projectId: string) {
    try {
      // Fetch Book
      const book = await this.bookRepository.fetchItem(projectId);
      this.bookRepository.storeItem(book);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
