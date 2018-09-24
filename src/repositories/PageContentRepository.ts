import firebase from "firebase";
import PageContentEntity from '@/entities/PageContent'

const collection = 'pages'

export default class ProjectTreeRepository {
  constructor() {}

  async create(item: PageContentEntity): Promise<firebase.firestore.DocumentReference> {
    const props = item.props
    const ref = firebase.firestore().collection(collection).doc(props.identifier)
    
    await ref.set({
      ...props
    })
    return ref
  }
}
