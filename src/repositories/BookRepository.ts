import firebase from "firebase";
import uuidv4 from "uuid/v4";
import store from "@/store";
import {
  StoreItems,
  ResetItems,
  StoreItem,
  ResetItem
} from "@/store/modules/book/types";
import BookEntity, { IBook } from "@/entities/Book";
import { IProjectTree } from "@/entities/ProjectTree";
import { IPageContent } from "@/entities/PageContent";
import { IPage } from "@/entities/Page";
import { IChapter } from "@/entities/Chapter";

const collection = "test-projects";

export default class BookRepository {
  constructor() {}

  // async getAllPages(identifier: string) {
  //   // Get Project Tree
  //   const projectSnapshot = await firebase.firestore().collection('test-projects').doc(identifier).get()
  //   const projectTreeIdentifier = await (projectSnapshot.data() as IBook).identifier
  //   const projectTreeSnapshot = await firebase.firestore().collection('projectTree').doc(projectTreeIdentifier).get()
  //   const projectTree = await projectTreeSnapshot.data() as IProjectTree

  //   // Method to scan all pages in single chapter
  //   const walk = (chapter: IChapter): IPage[] => {
  //     const pagesInChapters = chapter.chapters.reduce((prev, current) => {
  //       const pages = [
  //         ...prev,
  //         ...walk(current)
  //       ]
  //       return pages
  //     }, ([] as IPage[]))

  //     return [
  //       ...pagesInChapters,
  //       ...chapter.pages
  //     ]
  //   }

  //   // Get all page IDs on the project
  //   const pagesByRefs = [
  //     ...projectTree.chapters.reduce((prev, current) => {
  //       const pages = [
  //         ...prev,
  //         ...walk(current)
  //       ]
  //       return pages
  //     }, ([] as IPage[])),
  //     ...projectTree.pages
  //   ].map(page => page.pageContent)

  //   // Get all pageContents
  //   const pageContents = pagesByRefs.map(async (ref) => {
  //     const pageContentRef = await ref.get()
  //     return await pageContentRef.data() as IPageContent
  //   })
  // }

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
    const ref = firebase
      .firestore()
      .collection(collection)
      .doc(identifier);

    await ref.update({
      content,
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
    const identifier = uuidv4();
    const book: IBook = {
      ...entity.getProps(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      identifier,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
    };

    await firebase
      .firestore()
      .collection(collection)
      .doc(identifier)
      .set(book);
    return identifier;
  }
}
