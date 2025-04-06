import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "fittrack-pro.firebaseapp.com",
  projectId: "fittrack-pro",
  storageBucket: "fittrack-pro.appspot.com",
  messagingSenderId: "408045103587",
  appId: "1:408045103587:web:5141d6e482c9a294f8b5c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;