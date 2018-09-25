import PageContentRepository from '@/repositories/PageContentRepository'
import ErrorService from '@/services/ErrorService'
import PageEntity from '@/entities/Page'

export interface ISelectPageUseCase {
  pagecontentRepository: PageContentRepository
  errorService: ErrorService
}

export default class SelectPageUseCase implements UseCase {
  pagecontentRepository: PageContentRepository
  errorService: ErrorService

  constructor({ pagecontentRepository, errorService }: ISelectPageUseCase) {
    this.pagecontentRepository = pagecontentRepository
    this.errorService = errorService
  }

  async execute(pageEntity: PageEntity): Promise<void> {
    console.log('usecase called')
    try {
      const ref = pageEntity.props.pageContent
      console.log(ref)
      const pageContent = await this.pagecontentRepository.fetchItemByRef(ref)

      this.pagecontentRepository.addItem(pageContent)
      this.pagecontentRepository.storeItem(pageContent)

    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}