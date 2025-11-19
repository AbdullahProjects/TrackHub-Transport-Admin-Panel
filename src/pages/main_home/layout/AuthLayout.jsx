import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default AuthLayout;
