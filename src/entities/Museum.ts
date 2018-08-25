import firebase from "firebase";

export interface IMuseum {
  address: string;
  createdAt: firebase.firestore.Timestamp;
  entry: string;
  img: string;
  lat: number;
  lng: number;
  name: string;
  siteUrl: string;
  updatedAt: firebase.firestore.Timestamp;
  identifier: string
}
