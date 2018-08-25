import firebase from "firebase";
import store from "@/store";
import {
  StoreMuseums,
  ResetMuseums
} from "@/store/modules/unregisteredMuseum/types";
import UnregisteredMuseumEntity, { IUnregisteredMuseum } from "@/entities/UnregisteredMuseum";
import {
  pascalToCamelTranslator,
  camelToPascalTranslator
} from "@/utils/translator";

const museumSource = "museumSource"

export default class UnregisteredRepository {
  constructor() {}

  async fetchMuseums(): Promise<IUnregisteredMuseum[]> {
    const items: IUnregisteredMuseum[] = [];
    const snapshot = await firebase
      .firestore()
      .collection(museumSource)
      .where("ParentID", "==", null)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();

      // translate keys
      Object.keys(item).forEach(key => {
        const camelKey = pascalToCamelTranslator(key);

        item[camelKey] = item[key];
        delete item[key];
      });

      items.push(item as IUnregisteredMuseum);
    });

    return items;
  }

  async fetchItem(identifier: string): Promise<IUnregisteredMuseum> {
    const snapshot = await firebase
      .firestore()
      .collection(museumSource)
      .doc(identifier)
      .get();
    const item = snapshot.data()!;

    // translate keys
    Object.keys(item).forEach(key => {
      const camelKey = pascalToCamelTranslator(key);

      item[camelKey] = item[key];
      delete item[key];
    });

    return item as IUnregisteredMuseum;
  }

  saveMuseums(museums: IUnregisteredMuseum[]) {
    store.commit(new StoreMuseums(museums));
  }

  getMuseums(): IUnregisteredMuseum[] {
    return store.state.unregisteredMuseum.items
  }

  resetMuseums() {
    store.commit(new ResetMuseums());
  }

  async saveItem(item: UnregisteredMuseumEntity) {
    item.updatedAt = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    const data: any = {}

    // translate keys
    Object.keys(item).forEach(key => {
      const pascalKey = camelToPascalTranslator(key);

      data[pascalKey] = item[key as keyof UnregisteredMuseumEntity];
    });

    await firebase.firestore().collection(museumSource).doc(item.identifier).update(data)
  }
}
