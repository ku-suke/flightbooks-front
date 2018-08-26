import BaseUseCase from '@/usecases/BaseUseCase'
import BookRepository from '@/repositories/BookRepository'
import ErrorService from '@/services/ErrorService';

export interface ILoadContainerUseCase {
  bookRepository: BookRepository
  userId: string
  errorService: ErrorService
}

export default class LoadContainerUseCase implements BaseUseCase {
  bookRepository: BookRepository
  userId: string
  errorService: ErrorService

  constructor({ bookRepository, userId, errorService }: ILoadContainerUseCase) {
    this.bookRepository = bookRepository
    this.userId = userId
    this.errorService = errorService
  }

  async execute() {
    try {
      const items = await this.bookRepository.fetchItemsByUser(this.userId)
      this.bookRepository.saveItems(items)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}