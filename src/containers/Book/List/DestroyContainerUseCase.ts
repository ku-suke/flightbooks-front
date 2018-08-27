import BookRepository from "@/repositories/BookRepository";

export interface IDestroyContainerUseCase {
  bookRepository: BookRepository;
}

export default class DestroyContainerUseCase implements UseCase {
  bookRepository: BookRepository;

  constructor({ bookRepository }: IDestroyContainerUseCase) {
    this.bookRepository = bookRepository;
  }

  async execute() {
    await this.bookRepository.resetItems();
    return;
  }
}