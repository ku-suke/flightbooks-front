import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import ErrorService from "@/services/ErrorService";
import BuildSettingEntity from "@/entities/BuildSetting";

export interface ISaveBuildSettingUseCase {
  buildSettingRepository: BuildSettingRepository;
  errorService: ErrorService;
}

export default class SaveBuildSettingUseCase implements UseCase {
  buildSettingRepository: BuildSettingRepository;
  errorService: ErrorService;

  constructor({
    buildSettingRepository,
    errorService
  }: ISaveBuildSettingUseCase) {
    this.buildSettingRepository = buildSettingRepository;
    this.errorService = errorService;
  }

  async execute(item: BuildSettingEntity): Promise<void> {
    try {
      await this.buildSettingRepository.save(item);
    } catch (error) {
      await this.errorService.handle(error);
      throw new Error(error);
    }
  }
}
