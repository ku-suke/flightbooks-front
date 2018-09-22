import ProjectTreeRepository from '@/repositories/ProjectTreeRepository'
import ProjectTreeEntity, { IProjectTree } from '@/entities/ProjectTree'

export interface PresenterParams {
  projectTreeRepository: ProjectTreeRepository
}

export interface IPresenter {
  projectTree: ProjectTreeEntity
}

export default ({ projectTreeRepository }: PresenterParams): IPresenter => {

  return {
    projectTree: projectTreeRepository.getData()
  }
}
