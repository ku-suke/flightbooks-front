import firebase from "firebase";
import store from "@/store";
import { StoreData, ResetData } from "@/store/modules/projectTree/types";
import ProjectTreeEntity, { IProjectTree } from "@/entities/ProjectTree";

const projectTreeCollection = "projectTree";

export default class ProjectTreeRepository {
  constructor() {}

  async fetchItemByRef(
    ref: firebase.firestore.DocumentReference
  ): Promise<IProjectTree> {
    const snapshot = await ref.get();
    const item = snapshot.data();

    return item as IProjectTree;
  }

  async fetchItem(identifier: string): Promise<IProjectTree> {
    const snapshot = await firebase
      .firestore()
      .collection(projectTreeCollection)
      .doc(identifier)
      .get();
    const item = snapshot.data()!;

    return item as IProjectTree;
  }

  async save(item: ProjectTreeEntity) {
    const itemProps = item.props;
    const identifier = itemProps.identifier;
    const serialized = {
      ...itemProps
    };

    const ref = firebase
      .firestore()
      .collection(projectTreeCollection)
      .doc(identifier);
    await ref.update(serialized);

    // fetch item again then update local store
    const latestItem = await this.fetchItem(identifier);
    this.storeData(latestItem);
  }

  storeData(data: IProjectTree) {
    store.commit(new StoreData(data));
  }

  resetData() {
    store.commit(new ResetData());
  }

  getData() {
    return new ProjectTreeEntity(store.state.projectTree.data);
  }
}
