import firebase from "firebase";
import uuidv4 from "uuid/v4"
import store from "@/store";
import {
  StoreItems,
  ResetItems,
  StoreItem,
  ResetItem
} from "@/store/modules/museum/types";
import { IMuseum } from "@/entities/Museum";
import {
  pascalToCamelTranslator,
  camelToPascalTranslator
} from "@/utils/translator";
import UnregisteredMuseumEntity from '@/entities/UnregisteredMuseum';

const collection = "museum";

export default class MuseumRepository {
  constructor() {}

  async fetchItems(): Promise<IMuseum[]> {
    const items: IMuseum[] = [];
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      items.push(item as IMuseum);
    });

    return items;
  }

  async fetchItem(identifier: string): Promise<IMuseum> {
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .doc(identifier)
      .get();
    const item = snapshot.data()!;

    return item as IMuseum;
  }

  async updateItem(identifier: string, data: any) {
    const ref = firebase
      .firestore()
      .collection(collection)
      .doc(identifier);

    await ref.update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // fetch item againt then update local store
    const item = await this.fetchItem(identifier);
    this.saveItem(item);
  }

  async addItem(item: IMuseum): Promise<string> {
    const data: {[key: string]: any} = {}
    // translate keys
    Object.keys(item).forEach(key => {
      const pascalKey = camelToPascalTranslator(key);

      data[pascalKey] = item[key as keyof IMuseum]
    });

    const ref = await firebase.firestore().collection(collection).add(data)
    const identifier = ref.id
    return identifier
  }

  saveItems(items: IMuseum[]) {
    store.commit(new StoreItems(items));
  }

  saveItem(item: IMuseum) {
    store.commit(new StoreItem(item));
  }

  getItems(): IMuseum[] {
    return store.state.museum.items;
  }

  getItem(): IMuseum | null {
    return store.state.museum.item;
  }

  resetItems() {
    store.commit(new ResetItems());
  }

  resetItem() {
    store.commit(new ResetItem());
  }

  async registerItem(item: UnregisteredMuseumEntity): Promise<string> {
    const { address, entry, img, lat, lng, name, siteUrl } = item
    const identifier = uuidv4()
    const museum: IMuseum = {
      address,
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      entry,
      img,
      lat,
      lng,
      name,
      siteUrl,
      identifier,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    }
    const data: any = {}

    // translate keys
    Object.keys(museum).forEach(key => {
      const pascalKey = camelToPascalTranslator(key);

      data[pascalKey] = museum[key as keyof IMuseum];
    });

    await firebase.firestore().collection(collection).doc(identifier).set(data)
    return identifier
  }
}
