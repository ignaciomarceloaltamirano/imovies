import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBABhorf2x21zDwNXfrJgDz3rgts5x0iGc',
  authDomain: 'imovies-86792.firebaseapp.com',
  projectId: 'imovies-86792',
  storageBucket: 'imovies-86792.appspot.com',
  messagingSenderId: '161710565787',
  appId: '1:161710565787:web:1b1efe390bca29e9a7993e',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
// const storage = getStorage();

export default app;
export { auth, db };
