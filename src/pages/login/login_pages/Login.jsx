import Images from "../../../utils/common/Images";
import { Heading } from "../../../components/HeadingAndSubheading";
import AppButton from "../../../components/AppButton";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { LuEyeClosed } from "react-icons/lu";
import { loginUser, getUserDetails } from "../firebase/LoginFirebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAdminData } from "../../../redux_store/slices/auth/AuthSlice";
import "./style.css";
import RouteNames from "../../../utils/routing/RouteNames";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "uet-admin@gmail.com",
    password: "uet-admin-123",
  });

  const handleFormDataChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(formData.email, formData.password);
      if(user)
      console.log("User logged in with ID:", user.uid);
      const userDetails = await getUserDetails(user.uid);
    
      console.log("User details fetched:", userDetails);
      dispatch(setAdminData(userDetails));
      navigate(RouteNames.mainHome, {replace: true});
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message.split("Firebase: ")[1] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login w-full h-screen flex flex-row">
      <div className="section1 hidden lg:flex w-0 lg:w-[50%] bg-[#F2F6F9] items-center justify-center">
        <img
          src={Images.loginPageIllustration}
          alt="Illustration"
          className="w-[50%] h-auto"
        />
      </div>
      <div className="section2 w-full lg:w-[50%] bg-white overflow-y-auto px-10 pt-14 flex flex-col items-center lg:items-start">
        <img src={Images.logo} alt="Logo" className="w-[120px] h-auto" />
        <div className="mt-10">
          <Heading text={"Login"} />
        </div>
        <p className="text-textLight mt-2 text-[15px] w-[50%] text-center lg:text-left">
          Securely access the TrackHub Admin Panel to manage buses, drivers and
          routes
        </p>

        <form className="mt-8 w-full md:w-[70%]" onSubmit={loginHandler}>
          {/* Email */}
          <div className="input-field-div">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </div>

          {/* Password */}
          <div className="input-field-div relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleFormDataChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[45px] right-0 text-[15px] px-3 hover:cursor-pointer"
            >
              {!showPassword ? <LuEyeClosed /> : <GoEye />}
            </span>
          </div>

          {/* Login Button */}
          <div className="mt-10 mb-20">
            <AppButton
              isSubmitButton={true}
              text="Login"
              fullWidth={true}
              isLoading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
