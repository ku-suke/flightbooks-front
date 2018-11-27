import BuildSettingRepository from "@/repositories/BuildSettingRepository";
import { IBuildSetting } from "@/entities/BuildSetting";
import UserRepository from "@/repositories/UserRepository";
import PageContentRepository from "@/repositories/PageContentRepository";
import BookEntity from "@/entities/Book";
import BookRepository from "@/repositories/BookRepository";

export interface PresenterParams {
  buildSettingRepository: BuildSettingRepository;
  bookRepository: BookRepository;
  userRepository: UserRepository;
  pageContentRepository: PageContentRepository;
}

export interface IPresenter {
  buildSetting: IBuildSetting;
  userId: string;
  book: BookEntity;
  currentPage: string | null;
}

export default ({
  buildSettingRepository,
  bookRepository,
  userRepository,
  pageContentRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  const pageContent = pageContentRepository.getItem();
  const item = bookRepository.getItem();
  const buildSetting = buildSettingRepository.getData().props;
  if (!buildSetting.email) {
    buildSetting.email = currentUser.email;
  }
  return {
    buildSetting: buildSetting,
    userId: currentUser ? currentUser.uid : "",
    book: item ? new BookEntity(item) : null,
    currentPage: pageContent ? pageContent.props.identifier : null
  };
};
