import React, { useEffect, useState } from "react";
import Login from "./pages/login/login_pages/Login";
import Images from "./utils/common/Images";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminData,
  clearAdminData,
  setLoading,
} from "./redux_store/slices/auth/AuthSlice";
import {
  setOrganizationData,
  clearOrganizationData,
} from "./redux_store/slices/organization/OrganizationSlice";
import { getUserDetails } from "./pages/login/firebase/LoginFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import MainHome from "./pages/main_home/MainHome";
import { getOrganizationDetails } from "./pages/organization/firebase/OrganizationFirebase";

const App = () => {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(clearAdminData());
        dispatch(clearOrganizationData());
        dispatch(setLoading(false));
        return;
      }

      // Get Admin Profile Details from Firebase Firestore
      const userData = await getUserDetails(user.uid);
      dispatch(setAdminData(userData || null));
      console.log("User Data Fetched:", userData);
      // Get Organization Details from Firebase Firestore
      const organizationData = await getOrganizationDetails(
        userData.organizationId
      );
      dispatch(setOrganizationData(organizationData || null));
      console.log("Organization Data Fetched:", organizationData);
      dispatch(setLoading(false));
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full gap-5">
        <img src={Images.logo} alt="Logo" className="w-[200px]" />
        <MoonLoader
          color={"var(--color-primary)"}
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return <MainHome />;
};

export default App;
