export interface IChapter {
  identifier?: Identifier
  name: any
  isRenaming?: boolean
  owner: string
  chapters?:  IChapter[]
}

export default class ChapterEntity {
  private props: IChapter

  constructor(params: IChapter) {
    this.props = {
      chapters: [],
      ...params
    }
  }

  getProps(): IChapter {
    return this.props
  }

  getChapters(): ChapterEntity[] {
    return this.props.chapters.map(chapter => new ChapterEntity(chapter))
  }
}
