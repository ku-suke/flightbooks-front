import firebase from "firebase";
import store from "@/store";
import { StoreData, ResetData } from "@/store/modules/buildSetting/types";
import BuildSettingEntity, { IBuildSetting } from "@/entities/BuildSetting";

const buildSettingCollection = "build-setting";

export default class BuildSettingRepository {
  constructor() {}

  async create(
    item: BuildSettingEntity
  ): Promise<firebase.firestore.DocumentReference> {
    const itemProps = item.props;
    const identifier = itemProps.identifier;
    const ref = firebase
      .firestore()
      .collection(buildSettingCollection)
      .doc(identifier);
    await ref.set(itemProps);
    return ref;
  }

  async fetchItemByRef(
    ref: firebase.firestore.DocumentReference
  ): Promise<IBuildSetting> {
    const snapshot = await ref.get();
    const item = snapshot.data();

    return item as IBuildSetting;
  }

  async fetchItem(identifier: string): Promise<IBuildSetting> {
    const snapshot = await firebase
      .firestore()
      .collection(buildSettingCollection)
      .doc(identifier)
      .get();
    const item = snapshot.data()!;

    return item as IBuildSetting;
  }

  async save(item: BuildSettingEntity) {
    const itemProps = item.props;
    const identifier = itemProps.identifier;
    const serialized = {
      ...itemProps
    };

    const ref = firebase
      .firestore()
      .collection(buildSettingCollection)
      .doc(identifier);
    await ref.update(serialized);

    // fetch item again then update local store
    const latestItem = await this.fetchItem(identifier);
    this.storeData(latestItem);
  }

  storeData(data: IBuildSetting) {
    store.commit(new StoreData(data));
  }

  resetData() {
    store.commit(new ResetData());
  }

  getData() {
    return new BuildSettingEntity(store.state.buildSetting.data);
  }
}
