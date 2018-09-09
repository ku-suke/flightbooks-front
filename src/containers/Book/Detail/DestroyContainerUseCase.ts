import BookRepository from "@/repositories/BookRepository";
import ProjectTreeRepository from '@/repositories/ProjectTreeRepository'

export interface IDestroyContainerUseCase {
  bookRepository: BookRepository;
  projectTreeRepository: ProjectTreeRepository
}

export default class DestroyContainerUseCase implements UseCase {
  bookRepository: BookRepository;
  projectTreeRepository: ProjectTreeRepository

  constructor({ bookRepository, projectTreeRepository }: IDestroyContainerUseCase) {
    this.bookRepository = bookRepository;
    this.projectTreeRepository = projectTreeRepository
  }

  async execute() {
    await this.bookRepository.resetItem();
    await this.projectTreeRepository.resetData()
    return;
  }
}