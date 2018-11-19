import UserRepository from "@/repositories/UserRepository";
import PageContentRepository from "@/repositories/PageContentRepository";
import BookRepository from "@/repositories/BookRepository";
import BookEntity from "@/entities/Book";
import { IBook } from "@/entities/Book";

export interface PresenterParams {
  userRepository: UserRepository;
  pageContentRepository: PageContentRepository;
  bookRepository: BookRepository;
}

export interface IPresenter {
  userId: string;
  book: IBook;
  currentPage: string | null;
}

export default ({
  userRepository,
  bookRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  const pageContent = pageContentRepository.getItem();
  const item = bookRepository.getItem();
  return {
    userId: currentUser ? currentUser.uid : "",
    book: item ? new BookEntity(item).props : null,
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
