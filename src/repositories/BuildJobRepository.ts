import firebase from "firebase";
import store from "@/store";
import { StoreItems, StoreItem } from "@/store/modules/buildJob/types";
import BuildJobEntity, { IBuildJob } from "@/entities/BuildJob";

const collection = "build-job";

export default class BuildJobRepository {
  constructor() {}

  async create(
    item: BuildJobEntity
  ): Promise<firebase.firestore.DocumentReference> {
    const itemProps = item.props;
    const identifier = itemProps.identifier;
    const ref = firebase
      .firestore()
      .collection(collection)
      .doc(identifier);
    await ref.set(itemProps);
    return ref;
  }

  async createSnapshot(item: BuildJobEntity) {
    const buildSnapshot = firebase.functions().httpsCallable("buildSnapshot");
    const res = await buildSnapshot({ ref: item.props.identifier });
    console.log("res");
    console.log(res);
  }

  async fetchItemsByUser(userId: string): Promise<IBuildJob[]> {
    const items: IBuildJob[] = [];
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .where("owner", "==", userId)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      items.push(item as IBuildJob);
    });

    return items;
  }

  storeItmes(items: IBuildJob[]) {
    store.commit(new StoreItems(items));
  }

  storeItem(item: IBuildJob) {
    store.commit(new StoreItem(item));
  }

  getItems(): BuildJobEntity[] {
    return store.state.buildJob.items.map(item => new BuildJobEntity(item));
  }
}
