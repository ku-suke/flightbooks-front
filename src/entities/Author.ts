import firebase from "firebase";
import uuid from "uuid/v4";

export interface IAuthor {
  identifier: string;
  name: string;
  role?: string;
  profile?: string;
  link?: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

export default class AuthorEntity {
  private _props: IAuthor;

  constructor(params: IAuthor) {
    this._props = { ...params };
  }

  static newAuthor({
    name,
    role,
    profile,
    link
  }: {
    name: string;
    role: string;
    profile: string;
    link: string;
  }): AuthorEntity {
    return new AuthorEntity({
      identifier: uuid(),
      name,
      role,
      profile,
      link,
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    });
  }

  get props(): IAuthor {
    return this._props;
  }
}
