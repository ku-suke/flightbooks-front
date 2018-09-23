import uuid from 'uuid/v4'
import ChapterEntity, { IChapter } from '@/entities/Chapter'

export interface IProjectTree {
  identifier: Identifier;
  owner: string;
  chapters?: IChapter[]
}

export default class ProjectTreeEntity {
  private props: IProjectTree

  constructor(params: IProjectTree) {
    this.props = {
      chapters: [],
      ...params,
    }
  }

  getProps() {
    return this.props
  }

  getChapters(): ChapterEntity[] {
    return this.props.chapters.map(chapter => new ChapterEntity(chapter))
  }

  registerChapter({ name }: { name: string }) {
    const chapterEntity = new ChapterEntity({
      name,
      owner: this.props.owner,
      identifier: uuid()
    })

    this.props.chapters.push(chapterEntity.getProps())
  }
}
