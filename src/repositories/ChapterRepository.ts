import firebase from "firebase";
import uuidv4 from "uuid/v4";
import store from "@/store";
import {
  StoreItems,
  ResetItems,
  StoreItem,
  ResetItem
} from "@/store/modules/chapter/types";
import ChapterEntity, { IChapter } from "@/entities/Chapter";

const collection = "chapters";

export default class ChapterRepository {
  constructor() {}

  async fetchItemsByBook(bookId: string): Promise<IChapter[]> {
    const items: IChapter[] = [];
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .where("bookId", "==", bookId)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      items.push(item as IChapter);
    });

    return items;
  }

  async fetchItem(identifier: string): Promise<IChapter> {
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .doc(identifier)
      .get();
    const item = snapshot.data()!;

    return item as IChapter;
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

    // fetch item again then update local store
    const item = await this.fetchItem(identifier);
    this.saveItem(item);
  }

  async updateTitle(identifier: string, title: string) {
    const ref = firebase
      .firestore()
      .collection(collection)
      .doc(identifier);

    await ref.update({
      title,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // fetch item again then update local store
    const item = await this.fetchItem(identifier);
    this.saveItem(item);
  }

  async removeItem(identifier: string) {
    try {
      const ref = firebase
        .firestore()
        .collection(collection)
        .doc(identifier);
      await ref.delete();
    } catch (error) {
      throw new Error(error);
    }
  }

  saveItems(items: IChapter[]) {
    store.commit(new StoreItems(items));
  }

  saveItem(item: IChapter) {
    store.commit(new StoreItem(item));
  }

  getItems(): IChapter[] {
    return store.state.chapter.items;
  }

  getItem(): IChapter | null {
    return store.state.chapter.item;
  }

  resetItems() {
    store.commit(new ResetItems());
  }

  resetItem() {
    store.commit(new ResetItem());
  }

  async registerItem(entity: ChapterEntity): Promise<string> {
    const identifier = uuidv4();
    const Chapter: IChapter = {
      ...entity.props,
      // createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      identifier
      // updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    };

    await firebase
      .firestore()
      .collection(collection)
      .doc(identifier)
      .set(Chapter);
    return identifier;
  }
}
