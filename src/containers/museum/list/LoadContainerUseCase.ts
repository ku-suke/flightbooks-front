import ErrorService from "@/services/ErrorService";
import MuseumRepository from "@/repositories/MuseumRepository";

export interface ILoadContainerUseCase {
  museumRepository: MuseumRepository;
  errorService: ErrorService;
}

export default class LoadContainerUseCase implements UseCase {
  museumRepository: MuseumRepository;
  errorService: ErrorService;

  constructor({ museumRepository, errorService }: ILoadContainerUseCase) {
    this.museumRepository = museumRepository;
    this.errorService = errorService;
  }

  async execute() {
    try {
      const items = await this.museumRepository.fetchItems();
      this.museumRepository.saveItems(items);
    } catch (e) {
      await this.errorService.handle(e);
    }
    return;
  }
}
