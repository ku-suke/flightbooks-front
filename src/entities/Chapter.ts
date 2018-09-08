import firebase from "firebase";

export interface IChapter {
  identifier?: string;
  title: string;
  bookId: string;
  parentId: string;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export default class ChapterEntity {
  props: IChapter

  constructor(params: IChapter) {
    this.props = params
  }
}
