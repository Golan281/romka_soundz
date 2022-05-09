
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc, limit, startAfter, orderBy } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3-3nse4C_1Q3-cmwBBY9SdbVzv2DHgb8",
  authDomain: "romka-soundz.firebaseapp.com",
  projectId: "romka-soundz",
  storageBucket: "romka-soundz.appspot.com",
  messagingSenderId: "348076290336",
  appId: "1:348076290336:web:95e0b6a266afee3c33e745",
  measurementId: "G-WH7Z62VK1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getFirestore(app);
// const DB = collection(db, "romkaDB");
// const FORM_DB = collection(db, "forms");
const googleProvider = new GoogleAuthProvider();
const storage = getStorage();
const auth = getAuth();

export const APIcontrol = {
  queryForAll: query(collection(DB, "romkaDB")),
  queryForSinglePost: (postID) => {
    return query((collection(DB, "romkaDB")), where("postID", "==", `${postID}`))
  },
  // qForSearch: (userQ, isChecked) => {
  //   const searchBy = (isChecked) ? "userName" : "content";
  //   return query((collection(BORK_DB, "borkerDB")), where(`${searchBy}`, "==", `${userQ}`))
  // },
  getPosts: async (q) => {
    const querySnapshot = await getDocs(q);
    let fetchedPosts = [];
    let lastKey = '';
    querySnapshot.forEach((doc) => {
      fetchedPosts.push({
        id: doc.id,
        ...doc.data(),
      });
      lastKey = doc.data().date;
    }
    )
    return fetchedPosts;
  },
  uploadPost: async (userInputObj) => {
    try {
      const docRef = await addDoc(collection(DB, "romkaDB"), userInputObj);
      console.log("Document written with ID: ", docRef.id, 'and check firestore for the content sent');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  uploadSubscriber: async (userInputObj) => {
    try {
      // const docRef = await addDoc(collection(DB, "subscribeDB"), userInputObj);
      const docRef = await addDoc(collection(DB, "subscribeDB"), userInputObj);
      console.log("Document written with ID: ", docRef.id, 'and check firestore for the content sent');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  googleLogin: async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  },
  signOut: async () => {
    await signOut(auth);
  },
  authStateObserver: (callback) => {
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  },
  uploadPic: async (userFile) => {
    console.log(userFile);
    const userFileName = userFile.name ? `${userFile.name}` : 'img.jpg';
    const postID = helperProps.setId();
    const fileRef = ref(storage, `blog_images/${postID}/${userFileName}`);
    const currSnapShot = await uploadBytes(fileRef, userFile);
    const fileUrl = await getDownloadURL(fileRef);
    console.log('uploaded img>', fileUrl);
    console.log('postID >', postID);
    return { fileUrl, postID };
  },
}