import firebase from "firebase";
import store from "@/store";
import { AddItem, StoreItem } from "@/store/modules/pageContent/types";
import PageContentEntity, { IPageContent } from "@/entities/PageContent";

const collection = "pages";

export default class PageContentRepository {
  constructor() {}

  async create(
    item: PageContentEntity
  ): Promise<firebase.firestore.DocumentReference> {
    const props = item.props;
    const ref = firebase
      .firestore()
      .collection(collection)
      .doc(props.identifier);

    await ref.set({
      ...props
    });
    return ref;
  }

  async fetchItemById(identifier: string): Promise<IPageContent> {
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .doc(identifier)
      .get();
    const item = snapshot.data();

    return item as IPageContent;
  }

  async save(item: PageContentEntity): Promise<void> {
    const itemProps = item.props;
    const ref = firebase
      .firestore()
      .collection(collection)
      .doc(itemProps.identifier);
    await ref.update({
      ...itemProps
    });

    this.storeItem(item.props);
  }

  addItem(item: IPageContent) {
    store.commit(new AddItem(item));
  }

  storeItem(item: IPageContent) {
    store.commit(new StoreItem(item));
  }

  getItem(): PageContentEntity {
    const pageContent = store.state.pageContent.item;
    return pageContent ? new PageContentEntity(pageContent) : null;
  }
}
