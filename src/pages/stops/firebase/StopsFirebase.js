import { db } from "../../../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";

const addStop = async (stopData) => {
  try {
    const docRef = doc(collection(db, FirebaseCollections.stopsCollection));
    const data = {
      ...stopData,
      id: docRef.id,
      addedAt: serverTimestamp(),
    };
    await setDoc(docRef, data);
    return data.id;
  } catch (e) {
    console.log("Error while adding stop to firestore: " + e);
    throw e;
  }
};

const getStopById = async (stopDocId) => {
  try {
    const ref = doc(db, FirebaseCollections.stopsCollection, stopDocId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data();
  } catch (e) {
    console.log("Error while fetching stop by id: " + e);
    throw e;
  }
};

const getAllStops = async (orgId) => {
  try {
    const q = query(
      collection(db, FirebaseCollections.stopsCollection),
      where("organizationId", "==", orgId)
    );
    const snapshot = await getDocs(q);
    const list = [];
    snapshot.forEach((d) => list.push(d.data()));
    return list;
  } catch (e) {
    console.log("Error while fetching stops: " + e);
    throw e;
  }
};

const updateStopInFirestore = async (stopDocId, updatedData) => {
  try {
    const ref = doc(db, FirebaseCollections.stopsCollection, stopDocId);
    await updateDoc(ref, updatedData);
  } catch (e) {
    console.log("Error while updating stop: " + e);
    throw e;
  }
};

const deleteStopFromFirestore = async (stopDocId) => {
  try {
    await deleteDoc(doc(db, FirebaseCollections.stopsCollection, stopDocId));
  } catch (e) {
    console.log("Error while deleting stop: " + e);
    throw e;
  }
};

export { addStop, getStopById, getAllStops, updateStopInFirestore, deleteStopFromFirestore };
