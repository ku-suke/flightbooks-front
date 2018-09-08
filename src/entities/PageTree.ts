export interface IPageTree {
  title: any
  isRenaming?: boolean
}

export default class PageTreeEntity {
  props: IPageTree

  constructor(params: IPageTree) {
    const isRenaming = params.isRenaming || false
    this.props = {
      ...params,
      isRenaming
    }
  }
}
