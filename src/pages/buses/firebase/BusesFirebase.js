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
  updateDoc,
  deleteField,
  serverTimestamp,
} from "firebase/firestore";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";

// Add bus to Firebase Firestore
const addBus = async (busData) => {
  try {
    const docRef = doc(collection(db, FirebaseCollections.busesCollection));

    const data = {
      ...busData,
      id: docRef.id,
      addedAt: serverTimestamp(),
    };
    await setDoc(docRef, data);
  } catch (e) {
    console.log("Error while adding document to firebase firestore: " + e);
    throw e;
  }
};

// Get bus by id
const getBusById = async (busId) => {
  try {
    const busRef = doc(db, FirebaseCollections.busesCollection, busId);
    const busSnap = await getDoc(busRef);
    if (!busSnap.exists()) {
      return null;
    }
    return busSnap.data();
  } catch (e) {
    console.log("Error while fetching bus by id from firebase firestore: " + e);
    throw e;
  }
};

// Get all buses from Firebase Firestore
const getAllBuses = async (orgId) => {
  try {
    const q = query(
      collection(db, FirebaseCollections.busesCollection),
      where("organizationId", "==", orgId)
    );
    const querySnapshot = await getDocs(q);
    const buses = [];
    querySnapshot.forEach((doc) => {
      buses.push(doc.data());
    });
    return buses;
  } catch (e) {
    console.log("Error while fetching buses from firebase firestore: " + e);
    throw e;
  }
};

// Update bus in Firebase Firestore
const updateBusDataInFirestore = async (busId, updatedData) => {
  try {
    const busRef = doc(db, FirebaseCollections.busesCollection, busId);
    await setDoc(busRef, updatedData, { merge: true });
  } catch (e) {
    console.log("Error while updating bus in firebase firestore: " + e);
    throw e;
  }
};

// Delete bus from Firebase Firestore
const deleteBusFromFirestore = async (busId) => {
  try {
    await deleteDoc(doc(db, FirebaseCollections.busesCollection, busId));
  } catch (e) {
    console.log("Error while deleting bus from firebase firestore: " + e);
    throw e;
  }
};

// Assign Driver to Bus in Firebase Firestore
const assignDriverToBus = async (busId, driverId) => {
  try {
    const busDocRef = doc(db, FirebaseCollections.busesCollection, busId);
    await setDoc(busDocRef, { assignedDriverId: driverId }, { merge: true });
  } catch (e) {
    console.log("Error while assigning driver to bus" + e);
    throw e;
  }
};

// Clear assignedDriverId from all buses that had this driver assigned
const clearDriverFromBuses = async (driverId) => {
  try {
    const q = query(
      collection(db, FirebaseCollections.busesCollection),
      where("assignedDriverId", "==", driverId)
    );
    const querySnapshot = await getDocs(q);
    const updates = querySnapshot.docs.map((busDoc) =>
      updateDoc(busDoc.ref, { assignedDriverId: deleteField() })
    );
    await Promise.all(updates);
  } catch (e) {
    console.log("Error while clearing driver from buses: " + e);
    throw e;
  }
};

// Export functions
export {
  addBus,
  getBusById,
  getAllBuses,
  updateBusDataInFirestore,
  deleteBusFromFirestore,
  assignDriverToBus,
  clearDriverFromBuses,
};
