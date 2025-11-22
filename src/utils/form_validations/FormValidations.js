import { db } from "../../firebase/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import FirebaseCollections from "../common/FirebaseCollectionNames";

// Validate Name
const validateName = (value) => {
  const regex = /^[a-zA-Z\s'-]{2,50}$/;
  if (!value) {
    return "Name is required.";
  } else if (!regex.test(value)) {
    return "Please enter a valid name (letters only).";
  } else {
    return "";
  }
};

// Validate Phone
const validatePhone = (value) => {
  const regex = /^\d{11}$/; // exactly 11 digits
  if (!value) {
    return "Phone number is required.";
  } else if (!regex.test(value)) {
    return "Phone number must be 11 digits, only numbers allowed.";
  } else {
    return "";
  }
};

// Validate Password
function validatePassword(password) {
  if (password.length !== 6) {
    return "Password must be 6 characters long.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }

  return "";
}

const checkUsernameAndPasswordExists = async (username, password) => {
  try {
    const q = query(
      collection(db, FirebaseCollections.usersCollection),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking username and password:", error);
    return null;
  }
};

export {
  validateName,
  validatePhone,
  validatePassword,
  checkUsernameAndPasswordExists,
};
