import { initializeApp } from 'firebase/app';
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAScLwsQV_aeT63moZ7op02iXI9kzVuQo0",
  authDomain: "socialmedia-59503.firebaseapp.com",
  projectId: "socialmedia-59503",
  storageBucket: "socialmedia-59503.appspot.com",
  messagingSenderId: "836172652549",
  appId: "1:836172652549:web:ec8c83eee68c3bc4b7fc6c",
  measurementId: "G-E80X56CDW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var storage = getStorage(app);

export default storage;