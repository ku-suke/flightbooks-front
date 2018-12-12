import firebase from "firebase";
import uuid from "uuid/v4";
import PageContentEntity, { IPageContent } from "./PageContent";
import PageEntity, { IPage } from "./Page";

export interface IBook {
  identifier: string;
  name: string;
  owner: string;
  genre?: number;
  copyright: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  thumbanilUrl?: string;
  pages: IPage[];
  trash: IPage[];
}

export default class BookEntity {
  private _props: IBook;

  constructor(params: IBook) {
    const genre = params.genre || 0;
    this._props = {
      ...params,
      genre
    };
  }

  static newEntity({
    name,
    owner
  }: {
    name: string;
    owner: string;
  }): BookEntity {
    return new BookEntity({
      identifier: uuid(),
      name,
      owner,
      copyright: "",
      pages: [],
      trash: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    });
  }

  get pages(): PageEntity[] {
    return this._props.pages.map(page => new PageEntity(page));
  }

  registerPage({
    pageContentEntity
  }: {
    pageContentEntity: PageContentEntity;
  }) {
    // Bookには全データ格納しない。1行目、並び順、contentのID
    const page = new PageEntity({
      identifier: pageContentEntity.props.identifier,
      order: this._props.pages ? this._props.pages.length : 0,
      tagline: pageContentEntity.props.content.split("\n")[0].trim()
    });
    this._props.pages.push(page.props);
  }

  updatePage({ pageContentEntity }: { pageContentEntity: PageContentEntity }) {
    let newPages: IPage[] = [];
    // pagesからデータを探索
    this._props.pages.forEach((value: IPage, index: Number, array: IPage[]) => {
      if (value.identifier == pageContentEntity.props.identifier) {
        value.tagline = pageContentEntity.props.content.split("\n")[0].trim();
      }
      newPages.push(value);
    });
    this._props.pages = newPages;
  }

  deletePage({ identifier }: { identifier: string }) {
    let newPages: IPage[] = [];
    let movePage: IPage = null;
    // pagesからデータを探索しtrashに移動
    this._props.pages.forEach((value: IPage, index: Number, array: IPage[]) => {
      if (value.identifier == identifier) {
        movePage = value;
      } else {
        newPages.push(value);
      }
    });
    this._props.pages = newPages;
    if (this._props.trash == null) {
      this._props.trash = [];
    }
    this._props.trash.push(movePage);
  }

  get props(): IBook {
    return this._props;
  }
}
