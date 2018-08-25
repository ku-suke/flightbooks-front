import MuseumRepository from "@/repositories/MuseumRepository";

export interface IDestroyContainerUseCase {
  museumRepository: MuseumRepository;
}

export default class DestroyContainerUseCase implements UseCase {
  museumRepository: MuseumRepository;

  constructor({ museumRepository }: IDestroyContainerUseCase) {
    this.museumRepository = museumRepository;
  }

  async execute() {
    await this.museumRepository.resetItems();
    return;
  }
}
