export interface IChapter {
  identifier?: Identifier
  name: any
  isRenaming?: boolean
  owner: string
  chapters?:  IChapter[]
}

export default class ChapterEntity {
  private _props: IChapter

  constructor(params: IChapter) {
    this._props = {
      chapters: [],
      ...params
    }
  }

  get props(): IChapter {
    return this._props
  }

  getChapters(): ChapterEntity[] {
    return this._props.chapters.map(chapter => new ChapterEntity(chapter))
  }
}
