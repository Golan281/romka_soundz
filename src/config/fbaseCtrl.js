
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc,  } from "firebase/firestore";

import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import * as helperProps from "../lib/helpers";

const firebaseConfig = {
  apiKey: "AIzaSyA3-3nse4C_1Q3-cmwBBY9SdbVzv2DHgb8",
  authDomain: "romka-soundz.firebaseapp.com",
  projectId: "romka-soundz",
  storageBucket: "romka-soundz.appspot.com",
  messagingSenderId: "348076290336",
  appId: "1:348076290336:web:95e0b6a266afee3c33e745",
  measurementId: "G-WH7Z62VK1P"
};

const app = initializeApp(firebaseConfig);
const DB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage();
const auth = getAuth();

export const APIcontrol = {
  queryForAll: query(collection(DB, "romkaDB")),
  queryForSubs: query(collection(DB, "subscribeDB")),
  queryForSinglePost: (postID) => {
    return query((collection(DB, "romkaDB")), where("postID", "==", `${postID}`))
  },
  getPosts: async (q) => {
    const querySnapshot = await getDocs(q);
    let fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push({
        id: doc.id,
        ...doc.data(),
      });
    }
    )
    return fetchedPosts.reverse();
  },

  uploadPost: async (userInputObj) => {
    try {
      await addDoc(collection(DB, "romkaDB"), userInputObj);
      return `The post is live :)`
    } catch (e) {
      return `Error uploading post: You are not authorized, please contact the webmaster (${e})`;
    }
  },
  uploadSubscriber: async (userInputObj) => {
    try {
      const docRef = await addDoc(collection(DB, "subscribeDB"), userInputObj);
      console.log("Document written with ID: ", docRef.id, 'and check firestore for the content sent');
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  },
  googleLogin: async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return {user, token};
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.table(errorCode,errorMessage,email,credential)
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
    try {
      const userFileName = userFile.name ? `${userFile.name}` : 'img.jpg';
      const postID = helperProps.setId();
      const fileRef = ref(storage, `blog_images/${postID}/${userFileName}`);
      const currSnapShot = await uploadBytes(fileRef, userFile);
      const fileUrl = await getDownloadURL(fileRef);
      return { fileUrl, postID, currSnapShot };
    } catch (err) {
      return `Error uploading post: ${err}`;
    }
  },
}