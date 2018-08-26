import BaseUseCase from '@/usecases/BaseUseCase'
import BookRepository from '@/repositories/BookRepository'
import BookEntity from '@/entities/Book'
import ErrorService from '@/services/ErrorService'

export interface IRemoveBookUseCase {
  bookRepository: BookRepository
  errorService: ErrorService
}

export default class RemoveBookUseCase implements BaseUseCase {
  bookRepository: BookRepository
  errorService: ErrorService

  constructor({ bookRepository, errorService }: IRemoveBookUseCase) {
    this.bookRepository = bookRepository;
    this.errorService = errorService
  }

  async execute(identifier: string): Promise<void> {
    try {
      await this.bookRepository.removeItem(identifier)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
