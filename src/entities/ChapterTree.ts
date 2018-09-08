import PageTreeEntity from './PageTree'

export interface IChapterTree {
  title: any
  isRenaming?: boolean
}

export default class ChapterTreeEntity {
  props: IChapterTree
  chapters: ChapterTreeEntity[] = []
  pages: PageTreeEntity[] = []

  constructor(params: IChapterTree) {
    const isRenaming = params.isRenaming || false
    this.props = {
      ...params,
      isRenaming
    }
  }
}