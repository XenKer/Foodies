import {getApp, getApps, initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyANIBrHjhV7aGY14QqBxFo_KO4yBvSEb90",
  authDomain: "fawfb-557cd.firebaseapp.com",
  databaseURL: "https://fawfb-557cd-default-rtdb.firebaseio.com",
  projectId: "fawfb-557cd",
  storageBucket: "fawfb-557cd.appspot.com",
  messagingSenderId: "1041265360928",
  appId: "1:1041265360928:web:63ef6b297827c56b85bc45"
};


const appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(appInstance);
const firestore = getFirestore(appInstance);
const storage = getStorage(appInstance);

export { appInstance as app, firestore, storage, firebaseAuth };

// const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

// const firestore = getFirestore(app)
// const storage = getStorage(app)

// export {app, firestore, storage};
