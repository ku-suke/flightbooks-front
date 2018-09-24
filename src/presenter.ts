import { User } from "firebase";
import UserRepository from "@/repositories/UserRepository";

export interface IPresenter {
  userRepository: UserRepository;
}

export interface IPresenterState {
  currentUser: User | null;
  isAuthenticating: boolean;
}

export default ({ userRepository }: IPresenter): IPresenterState => {
  return {
    currentUser: userRepository.getCurrentUser(),
    isAuthenticating: userRepository.isAuthenticating()
  };
};
