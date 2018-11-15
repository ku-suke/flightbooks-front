import UserRepository from "@/repositories/UserRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import PageContentRepository from "@/repositories/PageContentRepository";
import ProjectTreeEntity from "@/entities/ProjectTree";
import BookRepository from "@/repositories/BookRepository";
import BookEntity from "@/entities/Book";
import { IBook } from "@/entities/Book";

export interface PresenterParams {
  userRepository: UserRepository;
  bookRepository: BookRepository;
  projectTreeRepository: ProjectTreeRepository;
  pageContentRepository: PageContentRepository;
}

export interface IPresenter {
  userId: string;
  book: IBook;
  projectTree: ProjectTreeEntity;
  currentPage: string | null;
}

export default ({
  userRepository,
  bookRepository,
  projectTreeRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  const pageContent = pageContentRepository.getItem();
  const item = bookRepository.getItem();
  return {
    userId: currentUser ? currentUser.uid : "",
    book: item ? new BookEntity(item).props : null,
    projectTree: projectTreeRepository.getData(),
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
