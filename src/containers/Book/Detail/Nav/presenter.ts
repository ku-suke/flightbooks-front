import ProjectTreeEntity, { IProjectTree } from '@/entities/ProjectTree'

export interface PresenterParams {
}

export interface IPresenter {
  projectTree: ProjectTreeEntity
}

export default ({}: PresenterParams): IPresenter => {
  const parmas: IProjectTree = {}

  const projectTree = new ProjectTreeEntity(parmas)

  return {
    projectTree
  }
}
