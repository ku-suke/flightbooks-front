import UserRepository from "@/repositories/UserRepository";
import BuildJobsRepository from '@/repositories/BuildJobRepository'
import BuildJobEntity from '@/entities/BuildJob'

export interface PresenterParams {
  buildJobRepository: BuildJobsRepository
  userRepository: UserRepository;
}

export interface IPresenter {
  userId: string;
  jobs: BuildJobEntity[]
}

export default ({
  userRepository,
  buildJobRepository
}: PresenterParams): IPresenter => {
  const currentUser = userRepository.getCurrentUser();
  return {
    userId: currentUser ? currentUser.uid : "",
    jobs: buildJobRepository.getItems()
  };
};
