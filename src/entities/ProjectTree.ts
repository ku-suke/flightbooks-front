import ChapterTreeEntity from '@/entities/ChapterTree'
import PageTreeEntity from '@/entities/PageTree'

const dummyChapterTree = (title: string) => new ChapterTreeEntity({ title })

export interface IProjectTree {
  identifier?: string;
}

export default class ProjectTreeEntity {
  props: IProjectTree
  chapters: ChapterTreeEntity[] = []

  constructor(params: IProjectTree) {
    this.props = params
    this.chapters.push(dummyChapterTree('第1章'))
    this.chapters.push(dummyChapterTree('第2章'))
    this.chapters.push(dummyChapterTree('第3章'))
    this.chapters[0].chapters.push(dummyChapterTree('第1節'))
    this.chapters[0].pages.push(new PageTreeEntity({ title: '1ページ' }))
  }

  registerChapter(title: string) {
    const chapter = new ChapterTreeEntity({ title })
    this.chapters.push(chapter)
  }
}