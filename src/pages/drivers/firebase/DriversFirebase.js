import { db } from "../../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  where,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";

// Add bus to Firebase Firestore
const addDriver = async (driverData) => {
  try {
    const docRef = doc(collection(db, FirebaseCollections.usersCollection));

    const data = {
      ...driverData,
      id: docRef.id,
      role: "driver",
    };
    await setDoc(docRef, data);
  } catch (e) {
    console.log("Error while adding document to firebase firestore: " + e);
    throw e;
  }
};

// Get driver by id
const getDriverById = async (driverId) => {
  try {
    const driverRef = doc(db, FirebaseCollections.usersCollection, driverId);
    const driverSnap = await getDoc(driverRef);
    if (!driverSnap.exists()) {
      return null;
    }
    return driverSnap.data();
  } catch (e) {
    console.log("Error while fetching driver by id from firebase firestore: " + e);
    throw e;
  }
};

// Get all drivers from Firebase Firestore
const getAllDrivers = async (orgId) => {
  try {
    const q = query(
      collection(db, FirebaseCollections.usersCollection),
      where("organizationId", "==", orgId),
      where("role", "==", "driver")
    );
    const querySnapshot = await getDocs(q);
    const drivers = [];
    querySnapshot.forEach((doc) => {
      drivers.push(doc.data());
    });
    return drivers;
  } catch (e) {
    console.log("Error while fetching drivers from firebase firestore: " + e);
    throw e;
  }
};

// Update driver in Firebase Firestore
const updateDriverDataInFirestore = async (driverId, updatedData) => {
  try{
    const driverRef = doc(db, FirebaseCollections.usersCollection, driverId);
    await setDoc(driverRef, updatedData, { merge: true });
  }
  catch (e) {
    console.log("Error while updating driver in firebase firestore: " + e);
    throw e;
  }
};

// Delete driver from Firebase Firestore
const deleteDriverFromFirestore = async (driverId) => {
  try {
    await deleteDoc(doc(db, FirebaseCollections.usersCollection, driverId));
  } catch (e) {
    console.log("Error while deleting driver from firebase firestore: " + e);
    throw e;
  }
};

// Export functions
export { addDriver, getDriverById, getAllDrivers, updateDriverDataInFirestore, deleteDriverFromFirestore };
