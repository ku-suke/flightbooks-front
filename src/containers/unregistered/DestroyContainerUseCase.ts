import UnregisteredMuseumRepository from "@/repositories/UnregisteredMuseumRepository"

export interface IDestroyContainerUseCase {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;
}

export default class DestroyContainerUseCase implements UseCase {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;

  constructor({ unregisteredMuseumRepository }: IDestroyContainerUseCase) {
    this.unregisteredMuseumRepository = unregisteredMuseumRepository;
  }

  async execute() {
    await this.unregisteredMuseumRepository.resetMuseums();
    return;
  }
}
