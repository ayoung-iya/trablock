import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAO16UyCI02Xuu3IWtjzz8NEB6Q7o2b27s',
  authDomain: 'trablock-review-image.firebaseapp.com',
  projectId: 'trablock-review-image',
  storageBucket: 'trablock-review-image.appspot.com',
  messagingSenderId: '990895624322',
  appId: '1:990895624322:web:a51fb2544c8e3b00e1a49b',
  measurementId: 'G-Z577F5FKEB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
