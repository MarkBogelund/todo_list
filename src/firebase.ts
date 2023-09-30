import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3YxX-D2KXRB9oyNgX8oEHuxuwW8FOS_s",
  authDomain: "your-todo-dd832.firebaseapp.com",
  projectId: "your-todo-dd832",
  storageBucket: "your-todo-dd832.appspot.com",
  messagingSenderId: "81365757859",
  appId: "1:81365757859:web:b53dff83d399dea305f416",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
