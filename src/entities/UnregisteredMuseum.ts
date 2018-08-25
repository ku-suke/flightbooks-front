import firebase from "firebase";

export interface IUnregisteredMuseum {
  address: string;
  createdAt: firebase.firestore.Timestamp;
  entry: string;
  identifier: string;
  img: string;
  lat: number;
  lng: number;
  name: string;
  siteUrl: string;
  updatedAt: firebase.firestore.Timestamp;
  source: string;
  parentID: string | null
}

export default class UnregisteredMuseumEntity implements IUnregisteredMuseum {
  address: string;
  createdAt: firebase.firestore.Timestamp;
  entry: string;
  identifier: string;
  img: string;
  lat: number;
  lng: number;
  name: string;
  siteUrl: string;
  updatedAt: firebase.firestore.Timestamp;
  source: string;
  parentID: string | null = null

  constructor(params: IUnregisteredMuseum) {
    this.address = params.address
    this.createdAt = params.createdAt
    this.entry = params.entry
    this.identifier = params.identifier
    this.img = params.img
    this.lat = params.lat
    this.lng = params.lng
    this.name = params.name
    this.siteUrl = params.siteUrl
    this.updatedAt = params.updatedAt
    this.source = params.source
  }

  register(parentId: string) {
    this.parentID = parentId
  }
}
