import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
};

const getUserDetails = async (userId) => {
  try {
    const userRef = doc(db, FirebaseCollections.usersCollection, userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    const profileData = userSnap.data();
    return profileData;
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error during logout:", err);
    throw err;
  }
};

export { loginUser, getUserDetails, logoutUser };