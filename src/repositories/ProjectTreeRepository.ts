import firebase from "firebase";
import store from "@/store";
import {
  StoreData,
  ResetData,
} from "@/store/modules/projectTree/types";
import { IProjectTree } from "@/entities/ProjectTree";

export default class ProjectTreeRepository {
  constructor() {}

  async fetchItemByRef(ref: firebase.firestore.DocumentReference): Promise<IProjectTree> {
    const snapshot = await ref.get();
    const item = snapshot.data();

    return item as IProjectTree;
  }

  storeData(data: IProjectTree) {
    store.commit(new StoreData(data))
  }

  resetData() {
    store.commit(new ResetData());
  }
}
