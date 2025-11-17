import { db } from "../../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";

const getOrganizationDetails = async (organizationId) => {
  try {
    const orgRef = doc(
      db,
      FirebaseCollections.organizationsCollection,
      organizationId
    );
    const orgSnap = await getDoc(orgRef);
    if (!orgSnap.exists()) {
      return null;
    }
    return orgSnap.data();
  } catch (err) {
    console.error("Error fetching organization details:", err);
    throw err;
  }
};

const updateOrganizationDetails = async (organizationId, data) => {
  try {
    const orgRef = doc(
      db,
      FirebaseCollections.organizationsCollection,
      organizationId
    );
    await updateDoc(orgRef, data);
  } catch (err) {
    console.error("Error updating organization details:", err);
    throw err;
  }
};

export { getOrganizationDetails, updateOrganizationDetails };
