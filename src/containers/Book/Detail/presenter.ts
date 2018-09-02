import BookRepository from '@/repositories/BookRepository'
import BookEntity from '@/entities/Book'

export interface PresenterParams {
  bookRepository: BookRepository
}

export interface IPresenter {
  book: BookEntity
  content: string
}

export default ({ bookRepository }: PresenterParams): IPresenter => {
  const item = bookRepository.getItem()
  return {
    book: item ? new BookEntity(item) : null,
    content: item ? item.content : ''
  }
}
