import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import ErrorService from "@/services/ErrorService";

export interface IFetchBuildSettingUseCase {
  buildSettingRepository: BuildSettingRepository;
  errorService: ErrorService;
}

export default class FetchBuildSettingUseCase implements UseCase {
  buildSettingRepository: BuildSettingRepository;
  errorService: ErrorService;

  constructor({
    buildSettingRepository,
    errorService
  }: IFetchBuildSettingUseCase) {
    this.buildSettingRepository = buildSettingRepository;
    this.errorService = errorService;
  }

  async execute(id: Identifier): Promise<void> {
    try {
      const item = await this.buildSettingRepository.fetchItem(id);
      this.buildSettingRepository.storeData(item);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
