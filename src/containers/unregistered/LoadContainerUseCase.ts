import ErrorService from "@/services/ErrorService";
import UnregisteredMuseumRepository from "@/repositories/UnregisteredMuseumRepository"

export interface ILoadContainerUseCase {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;
  errorService: ErrorService;
}

export default class LoadContainerUseCase implements UseCase {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;
  errorService: ErrorService;

  constructor({ unregisteredMuseumRepository, errorService }: ILoadContainerUseCase) {
    this.unregisteredMuseumRepository = unregisteredMuseumRepository;
    this.errorService = errorService;
  }

  async execute() {
    try {
      const museums = await this.unregisteredMuseumRepository.fetchMuseums();
      this.unregisteredMuseumRepository.saveMuseums(museums);
    } catch (e) {
      await this.errorService.handle(e);
    }
    return;
  }
}
