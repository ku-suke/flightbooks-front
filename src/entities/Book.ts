import firebase from "firebase";
import uuid from "uuid/v4";

export interface IBook {
  identifier: string;
  name: string;
  owner?: string;
  genre?: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  thumbanilUrl?: string;
  projectTreeRef: firebase.firestore.DocumentReference;
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
    owner,
    projectTreeRef
  }: {
    name: string;
    owner: string;
    projectTreeRef: firebase.firestore.DocumentReference;
  }): BookEntity {
    return new BookEntity({
      identifier: uuid(),
      name,
      owner,
      projectTreeRef,
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    });
  }

  get props(): IBook {
    return this._props;
  }
}
