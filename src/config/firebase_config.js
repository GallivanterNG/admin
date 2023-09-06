import { initializeApp } from "firebase/app";
import { arrayUnion, getDoc, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"
import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
// import { environment } from "./environment";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "gallivanter-ae8ae.firebaseapp.com",
  projectId: "gallivanter-ae8ae",
  storageBucket: "gallivanter-ae8ae.appspot.com",
  messagingSenderId: "543946443820",
  appId: "1:543946443820:web:8c74cfeb2e3903b0b95589",
  measurementId: "G-0RT2W5PK1R"
};


// const appConfig = environment === "test" ? firebaseTestConfig : environment === "production" ? firebaseConfig : null;

// if (!appConfig) {
//     throw new Error("Invalid environment or missing Firebase configuration.");
// }

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export const auth = getAuth(app)

export const addProvider = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data);
    return true
  } catch (error) {
    console.error(`Error adding document`, error);
    throw error;
  }
};


export const handleFile = (image) => {

  return new Promise((resolve, reject) => {
    console.log("image check")
    if (image == null) {
      reject("No image to upload");
      return;
    }
    const imageRef = ref(storage, `/images/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleCreateXp = async (
  userID,
  title,
  price,
  description,
  date,
  bookings,
  image
) => {
  try {
    const imageURL = await handleFile(image);
    console.log("Image Uploaded");

    const collectionRef = doc(db, "providers", userID);

    // Get the current document data
    const docSnapshot = await getDoc(collectionRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // Ensure 'listings' exists and is an array, or initialize it
      if (!Array.isArray(data.listings)) {
        data.listings = [];
      }

      // Add a new item to the 'listings' array
      const newListing = {
        title,
        price,
        description,
        date,
        bookings,
        imageURL,
      };

      data.listings.push(newListing);

      // Update the document with the modified 'listings' array
      await updateDoc(collectionRef, {
        listings: data.listings,
      });

      console.log("Updated");
      return true;
    } else {
      console.error("Document does not exist.");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};



export const useFetchData = (collectionName, userId) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, collectionName, userId);
      onSnapshot(ref, (doc) => {
        setData(doc.data())
      })
    };
    fetchData();
  }, []);
  console.log(data)
  return data;

};

