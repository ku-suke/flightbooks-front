import BookRepository from "@/repositories/BookRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import BookEntity from "@/entities/Book";
import ProjectTreeEntity from "@/entities/ProjectTree";
import ErrorService from "@/services/ErrorService";

export interface IRegisterBookUseCase {
  bookRepository: BookRepository;
  projectTreeRepository: ProjectTreeRepository;
  errorService: ErrorService;
}

export default class RegisterBookUseCase implements UseCase {
  bookRepository: BookRepository;
  projectTreeRepository: ProjectTreeRepository;
  errorService: ErrorService;

  constructor({
    bookRepository,
    projectTreeRepository,
    errorService
  }: IRegisterBookUseCase) {
    this.bookRepository = bookRepository;
    this.projectTreeRepository = projectTreeRepository;
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
      // Register Empty ProjectTree
      const projectTreeEntity = ProjectTreeEntity.newEntity({ owner });
      const projectTreeRef = await this.projectTreeRepository.create(
        projectTreeEntity
      );

      // Register New Book
      const bookEntity = BookEntity.newEntity({ name, owner, projectTreeRef });
      await this.bookRepository.create(bookEntity);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
