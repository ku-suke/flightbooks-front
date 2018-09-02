import BookRepository from '@/repositories/BookRepository'
import BookEntity from '@/entities/Book'

export interface PresenterParams {
  bookRepository: BookRepository
}

export interface IPresenter {
  book: BookEntity
}

export default ({ bookRepository }: PresenterParams): IPresenter => {
  return {
    book: new BookEntity(bookRepository.getItem())
  }
}
