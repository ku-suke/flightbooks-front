import BuildJobRepository from '@/repositories/BuildJobRepository'
import ErrorService from '@/services/ErrorService'

export interface IFetchBuildJobListUseCase {
  buildJobRepository: BuildJobRepository
  errorService: ErrorService
}

export default class FetchBuildJobListUseCase implements UseCase {
  buildJobRepository: BuildJobRepository
  errorService: ErrorService

  constructor({ buildJobRepository, errorService }: IFetchBuildJobListUseCase) {
    this.buildJobRepository = buildJobRepository
    this.errorService = errorService
  }

  async execute(userId: string): Promise<void> {
    try {
      const items = await this.buildJobRepository.fetchItemsByUser(userId)
      this.buildJobRepository.storeItmes(items)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}