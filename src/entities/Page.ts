import firebase from "firebase";

export interface IPage {
  identifier?: Identifier;
  name: any;
  owner: string;
  pageContent?: firebase.firestore.DocumentReference;
}

export default class PageEntity {
  private _props: IPage;

  constructor(params: IPage) {
    this._props = {
      ...params
    };
  }

  get props(): IPage {
    return this._props;
  }
}
