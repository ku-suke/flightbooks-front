import BaseUseCase from '@/usecases/BaseUseCase'
import BookRepository from '@/repositories/BookRepository'
import ErrorService from '@/services/ErrorService';

export interface ILoadContainerUseCase {
  bookRepository: BookRepository
  projectId: string
  errorService: ErrorService
}

export default class LoadContainerUseCase implements BaseUseCase {
  bookRepository: BookRepository
  projectId: string
  errorService: ErrorService

  constructor({ bookRepository, projectId, errorService }: ILoadContainerUseCase) {
    this.bookRepository = bookRepository
    this.projectId = projectId
    this.errorService = errorService
  }

  async execute() {
    try {
      const item = await this.bookRepository.fetchItem(this.projectId)
      this.bookRepository.saveItem(item)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}