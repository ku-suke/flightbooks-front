import ErrorService from "@/services/ErrorService";
import MuseumRepository from "@/repositories/MuseumRepository";

export interface ILoadContainerUseCase {
  museumRepository: MuseumRepository;
  errorService: ErrorService;
  identifier: string;
}

export default class LoadContainerUseCase implements UseCase {
  museumRepository: MuseumRepository;
  errorService: ErrorService;
  identifier: string;

  constructor({
    museumRepository,
    errorService,
    identifier
  }: ILoadContainerUseCase) {
    this.museumRepository = museumRepository;
    this.errorService = errorService;
    this.identifier = identifier;
  }

  async execute() {
    try {
      const item = await this.museumRepository.fetchItem(this.identifier);
      this.museumRepository.saveItem(item);
    } catch (e) {
      await this.errorService.handle(e);
    }
    return;
  }
}
