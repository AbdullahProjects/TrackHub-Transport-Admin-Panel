import AppButton from "../../components/AppButton";
import Lottie from "lottie-react";
import Images from "../../utils/common/Images";
import { Navigate, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", {replace: true});
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <Lottie
        animationData={Images.error404Animation}
        loop={true}
        className="w-64 h-auto mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <AppButton onTap={handleGoHome} text={"Go to Home Page"} />
    </div>
  );
};

export default NotFound;
