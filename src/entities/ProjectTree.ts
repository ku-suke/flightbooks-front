import uuid from 'uuid/v4'
import ChapterEntity, { IChapter } from '@/entities/Chapter'

export interface IProjectTree {
  identifier: Identifier;
  owner: string;
  chapters?: IChapter[]
}

export default class ProjectTreeEntity {
  private _props: IProjectTree

  constructor(params: IProjectTree) {
    this._props = {
      chapters: [],
      ...params,
    }
  }

  get props() {
    return this._props
  }

  get chapters(): ChapterEntity[] {
    return this._props.chapters.map(chapter => new ChapterEntity(chapter))
  }

  registerChapter({ name, parentId }: { name: string, parentId: string }) {
    const chapterEntity = new ChapterEntity({
      name,
      owner: this._props.owner,
      identifier: uuid()
    })

    const pushToParent = (chapters: IChapter[]): IChapter[]=> {
      return chapters.reduce((prev, chapter) => {
        if (chapter.identifier === parentId) {
          chapter.chapters.push(chapterEntity.props)
        } else {
          chapter.chapters = pushToParent(chapter.chapters)
        }
        prev.push(chapter)
        return prev
      }, [])
    }

    if (this._props.identifier === parentId) {
      this._props.chapters.push(chapterEntity.props)
      return
    } else {
      this._props.chapters = pushToParent(this._props.chapters)
    }
  }
}
