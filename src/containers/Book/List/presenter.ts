import UserRepository from "@/repositories/UserRepository";
import BookRepository from "@/repositories/BookRepository";
import BookEntity from "@/entities/Book";

export interface PresenterParams {
  bookRepository: BookRepository;
  userRepository: UserRepository;
}

export interface IPresenter {
  userId: string;
  books: BookEntity[];
}

export default ({
  userRepository,
  bookRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  return {
    userId: currentUser ? currentUser.uid : "",
    books: bookRepository.getItems().map(item => new BookEntity(item))
  };
};
