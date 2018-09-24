import firebase from "firebase";
import store from "@/store";
import {
  SignIn,
  SignOut,
  StartAuthentication,
  FinishAuthentication
} from "@/store/modules/user/types";

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

const init = () => {
  firebase.initializeApp(config);

  store.commit(new StartAuthentication());

  firebase.auth().onAuthStateChanged(user => {
    store.commit(new StartAuthentication());
    if (user) {
      store.commit(new SignIn(user));
    } else {
      store.commit(new SignOut());
    }
    store.commit(new FinishAuthentication());
  });

  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
};

export default init;
