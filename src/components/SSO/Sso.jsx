import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
import Header from "../Header";
import Api from "../AxiosInterceptor/Api";

const Sso = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { setUserData, setRole } = useContext(UserContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticating) return; // Prevent multiple authentication attempts
      setIsAuthenticating(true);

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");

        if (tokenFromUrl) {
          // Store the token in localStorage
          localStorage.setItem("access_token", tokenFromUrl);
          // Remove the token from the URL
          window.history.replaceState({}, document.title, "/");
        }

        const token = localStorage.getItem("access_token");
        console.log(token);

        if (!token) {
          console.log("No token, requesting login URL");
          const response = await Api.get("/auth/login");
          console.log("Login response:", response);

          if (response.data && response.data.redirectUrl) {
            console.log("Redirecting to:", response.data.redirectUrl);
            window.location.href = response.data.redirectUrl;
          } else {
            console.error("Redirect URL not found in the response.");
          }
        } else {
          console.log("Token present, fetching user data");
          const userResponse = await Api.get("/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("User data response:", userResponse);

          if (userResponse.status === 200) {
            const userData = userResponse.data;
            setUserData(userData);
            const userMetadata =
              userData["https://your-namespace/user_metadata"];
            const role = userMetadata ? userMetadata.role : "No role assigned";
            setRole(role);
            console.log("User authenticated, navigating to home");
            navigate("/home");
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("access_token");
        navigate("/login");
      } finally {
        setIsAuthenticating(false);
      }
    };

    authenticateUser();
  }, []);

  return (
    <>
      {localStorage.getItem("access_token") ? (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <div>Authenticating...</div>
      )}
    </>
  );
};

export default Sso;
