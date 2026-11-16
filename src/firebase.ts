import {
  getFirestore,
  initializeFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  addDoc,
  limit,
  getDocFromServer,
  Firestore,
  setLogLevel,
} from 'firebase/firestore';
import {
  app,
  auth,
  googleProvider,
  firebaseConfig,
  isAutomatedAuditEnvironment,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
} from './firebaseAuth';

// Silence verbose Firestore WebChannel retry warnings in console on throttled/offline networks
try {
  setLogLevel('silent');
} catch {
  // Ignore if unsupported
}

function initResilientFirestore(): Firestore {
  try {
    if (firebaseConfig.firestoreDatabaseId) {
      return initializeFirestore(
        app,
        {
          experimentalAutoDetectLongPolling: true,
        },
        firebaseConfig.firestoreDatabaseId
      );
    }
    return initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
    });
  } catch {
    return firebaseConfig.firestoreDatabaseId
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  }
}

export const db: Firestore = initResilientFirestore();

export {
  app,
  auth,
  googleProvider,
  isAutomatedAuditEnvironment,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  addDoc,
  limit,
  getDocFromServer,
};
export type { User };
