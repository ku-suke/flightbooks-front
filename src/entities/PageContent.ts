import uuid from "uuid/v4";

export interface IPageContent {
  identifier: Identifier;
  owner: string;
  content: string
}

export default class PageContentEntity {
  private _props: IPageContent;

  constructor(params: IPageContent) {
    this._props = {
      content: '',
      ...params
    };
  }

  static newEntity(owner: string): PageContentEntity {
    return new PageContentEntity({
      identifier: uuid(),
      content: '',
      owner
    })
  }

  get props(): IPageContent {
    return this._props;
  }
}
