import BookRepository from "@/repositories/BookRepository";
import ErrorService from "@/services/ErrorService";

export interface IUpdateContentUseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;
  projectId: string;
}

export default class UpdateContentUseCase implements UseCase {
  bookRepository: BookRepository;
  errorService: ErrorService;
  projectId: string;

  constructor({
    bookRepository,
    errorService,
    projectId
  }: IUpdateContentUseCase) {
    this.bookRepository = bookRepository;
    this.projectId = projectId;
    this.errorService = errorService;
  }

  async execute(content: string): Promise<void> {
    try {
      await this.bookRepository.updateContent(this.projectId, content);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
