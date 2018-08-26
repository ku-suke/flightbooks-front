import BaseUseCase from '@/usecases/BaseUseCase'
import BookRepository from '@/repositories/BookRepository'
import BookEntity from '@/entities/Book'
import ErrorService from '@/services/ErrorService'

export interface IRegisterMuseumUseCase {
  bookRepository: BookRepository
  errorService: ErrorService
}

export default class RegisterMuseumUseCase implements BaseUseCase {
  bookRepository: BookRepository
  errorService: ErrorService

  constructor({ bookRepository, errorService }: IRegisterMuseumUseCase) {
    this.bookRepository = bookRepository;
    this.errorService = errorService
  }

  async execute(entity: BookEntity): Promise<string> {
    try {
      const identifier = await this.bookRepository.registerItem(entity)
      return identifier
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
