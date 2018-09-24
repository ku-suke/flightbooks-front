import firebase from "firebase";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import ErrorService from "@/services/ErrorService";

export interface IInitProjectTreeUseCase {
  projectTreeRepository: ProjectTreeRepository;
  ref: firebase.firestore.DocumentReference;
  errorService: ErrorService;
}

export default class InitProjectTreeUseCase implements UseCase {
  projectTreeRepository: ProjectTreeRepository;
  ref: firebase.firestore.DocumentReference;
  errorService: ErrorService;

  constructor({
    projectTreeRepository,
    ref,
    errorService
  }: IInitProjectTreeUseCase) {
    this.projectTreeRepository = projectTreeRepository;
    this.ref = ref;
    this.errorService = errorService;
  }

  async execute() {
    try {
      const projectTree = await this.projectTreeRepository.fetchItemByRef(
        this.ref
      );
      this.projectTreeRepository.storeData(projectTree);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
