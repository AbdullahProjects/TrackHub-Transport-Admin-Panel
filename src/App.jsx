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
import { getUserDetails } from "./pages/login/firebase/LoginFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "./firebase/firebase";
import RouteNames from "./utils/routing/RouteNames";
import AppRoutes from "./utils/routing/AppRoutes";
import MainHome from "./pages/main_home/MainHome";

const App = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(clearAdminData());
        dispatch(setLoading(false));
        return;
      }

      const userData = await getUserDetails(user.uid);
      dispatch(setAdminData(userData || null));
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

  return <MainHome/>;
};

export default App;
