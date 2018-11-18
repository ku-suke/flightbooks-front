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
      order: this._props.pages.length,
      tagline: pageContentEntity.props.content.split("\n")[0].trim()
    });
    this._props.pages.push(page.props);
  }

  get props(): IBook {
    return this._props;
  }
}
