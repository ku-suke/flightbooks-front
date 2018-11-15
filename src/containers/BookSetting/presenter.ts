import UserRepository from "@/repositories/UserRepository";
import BookRepository from "@/repositories/BookRepository";
import BookEntity from "@/entities/Book";
import { IBook } from "@/entities/Book";

export interface PresenterParams {
  bookRepository: BookRepository;
}

export interface IPresenter {
  book: IBook;
}

export default ({ bookRepository }: PresenterParams): IPresenter => {
  const item = bookRepository.getItem();
  return {
    book: item ? new BookEntity(item).props : null
  };
};
