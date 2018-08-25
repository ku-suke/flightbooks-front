import MuseumRepository from "@/repositories/MuseumRepository"
import UnregisteredMuseumRepository from "@/repositories/UnregisteredMuseumRepository"
import UnregisteredMuseumEntity from "@/entities/UnregisteredMuseum"

export interface IRegisterMuseumUseCase {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;
  unregisteredMuseumEntity: UnregisteredMuseumEntity
  museumRepository: MuseumRepository
}

export default class RegisterMuseumUseCase implements UseCase {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;
  unregisteredMuseumEntity: UnregisteredMuseumEntity
  museumRepository: MuseumRepository

  constructor({ unregisteredMuseumRepository, unregisteredMuseumEntity, museumRepository }: IRegisterMuseumUseCase) {
    this.unregisteredMuseumRepository = unregisteredMuseumRepository;
    this.unregisteredMuseumEntity = unregisteredMuseumEntity
    this.museumRepository = museumRepository
  }

  async execute() {
    try {
      const entity = this.unregisteredMuseumEntity
      const identifier = await this.museumRepository.registerItem(entity)
      entity.register(identifier)
      this.unregisteredMuseumRepository.saveItem(entity)
    } catch (error) {
      
    }
    return;
  }
}
