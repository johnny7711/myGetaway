import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};


const apps = getApps();

const firebaseApp = !apps.length ? initializeApp(firebaseConfig) : apps[0]

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const isEmulating = process.env.NODE_ENV === 'dev'
if(isEmulating){
  console.log(window.location.hostname)
  connectAuthEmulator(auth, 'http://192.168.3.29:9099')
  connectFirestoreEmulator(db, '192.168.3.29', 8080)
  connectStorageEmulator(storage, '192.168.3.29', 9199)
}

export {auth, db, storage}