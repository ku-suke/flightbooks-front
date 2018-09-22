import firebase from "firebase";
import uuidv4 from "uuid/v4"
import store from "@/store";
import {
  StoreItems,
  ResetItems,
  StoreItem,
  ResetItem,
} from "@/store/modules/book/types";
import BookEntity, { IBook } from "@/entities/Book";

const collection = "test-projects";

export default class BookRepository {
  constructor() {}

  async fetchItemsByUser(userId: string): Promise<IBook[]> {
    const items: IBook[] = [];
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .where("userId", "==", userId)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      items.push(item as IBook);
    });

    return items;
  }

  async fetchItem(identifier: string): Promise<IBook> {
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .doc(identifier)
      .get();
    const item = snapshot.data()!;

    return item as IBook;
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

  async updateContent(identifier: string, content: string) {
    const ref = firebase.firestore().collection(collection).doc(identifier)

    await ref.update({
      content,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    // fetch item again then update local store
    const item = await this.fetchItem(identifier);
    this.saveItem(item);
  }
  
  async removeItem(identifier: string) {
    try {
    const ref = firebase.firestore().collection(collection).doc(identifier)
    await ref.delete()
    } catch (error) {
      throw new Error(error)
    }
  }

  saveItems(items: IBook[]) {
    store.commit(new StoreItems(items));
  }

  saveItem(item: IBook) {
    store.commit(new StoreItem(item));
  }

  getItems(): IBook[] {
    return store.state.book.items;
  }

  getItem(): IBook | null {
    return store.state.book.item;
  }

  resetItems() {
    store.commit(new ResetItems());
  }

  resetItem() {
    store.commit(new ResetItem());
  }

  async registerItem(entity: BookEntity): Promise<string> {
    const identifier = uuidv4()
    const book: IBook = {
      ...entity.getProps(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      identifier,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    }

    await firebase.firestore().collection(collection).doc(identifier).set(book)
    return identifier
  }
}
