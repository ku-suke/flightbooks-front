import ErrorService from "@/services/ErrorService";
import MuseumRepository from "@/repositories/MuseumRepository";

export interface IUpdateMuseumUseCase {
  museumRepository: MuseumRepository;
  errorService: ErrorService;
  identifier: string;
}

export default class UpdateMuseumUseCase implements UseCase {
  museumRepository: MuseumRepository;
  errorService: ErrorService;
  identifier: string;

  constructor({
    museumRepository,
    errorService,
    identifier
  }: IUpdateMuseumUseCase) {
    this.museumRepository = museumRepository;
    this.errorService = errorService;
    this.identifier = identifier;
  }

  async execute(data: any) {
    try {
      await this.museumRepository.updateItem(this.identifier, data);
    } catch (e) {
      await this.errorService.handle(e);
    }
    return;
  }
}
