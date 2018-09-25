import firebase from "firebase";
import store from '@/store'
import { StoreItems, StoreItem } from '@/store/modules/buildJob/types'
import BuildJobEntity, { IBuildJob } from '@/entities/BuildJob'

const collection = 'generation'

export default class BuildJobRepository {
  constructor() {}

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
    store.commit(new StoreItems(items))
  }

  storeItem(item: IBuildJob) {
    store.commit(new StoreItem(item))
  }

  getItems(): BuildJobEntity[] {
    return []
    return store.state.buildJob.items.map(item => new BuildJobEntity(item))
  }
}
