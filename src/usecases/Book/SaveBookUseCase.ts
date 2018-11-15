import BookRepository from "@/repositories/BookRepository";
import ErrorService from "@/services/ErrorService";
import BookEntity from "@/entities/Book";

export interface ISaveBookUseCase {
  BookRepository: BookRepository;
  errorService: ErrorService;
}

export default class SaveBookUseCase implements UseCase {
  BookRepository: BookRepository;
  errorService: ErrorService;

  constructor({ BookRepository, errorService }: ISaveBookUseCase) {
    this.BookRepository = BookRepository;
    this.errorService = errorService;
  }

  async execute(item: BookEntity): Promise<void> {
    try {
      const exists = await this.BookRepository.fetchItem(item.props.identifier);
      if (exists) {
        await this.BookRepository.save(item);
      } else {
        await this.BookRepository.create(item);
      }
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
