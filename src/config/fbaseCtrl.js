import env from "react-dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc,  } from "firebase/firestore";

import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import * as helperProps from "../lib/helpers";

const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_DOMAIN,
  projectId: "romka-soundz",
  storageBucket: env.REACT_APP_BUCKET,
  messagingSenderId: env.REACT_APP_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
  measurementId: env.REACT_APP_MEASUREMENT_ID,
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
      const emailTriggerObj = {
        to: ['me@golandev.tech', 'roman050586@gmail.com'],
        message: {
          subject: "New subscriber to Romka Soundz!",
          html: `<h1>Congrats! Please see the attached details:</h1><br><h2>Name: ${userInputObj.firstName} ${userInputObj.lastName}</h2><br><p>${userInputObj.email}</p><br><p><u>Did opt in for updates?</u> ${userInputObj.didOptIn}</p>`,
        },
      };
      const emailRef = await addDoc(collection(DB, "mail"), emailTriggerObj);
      console.log("Document written with ID: ", emailRef.id, 'and check firestore/email for the content sent');
      console.log("Document written with ID: ", docRef.id, 'and check firestore for the content sent');
    } catch (e) {
      console.error("Error adding doc & mail: ", e);
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