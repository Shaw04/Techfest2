import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
import Header from "../Header";

const Sso = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading, error } =
    useAuth0();
  const navigate = useNavigate();
  // const [isCheckingSession, setIsCheckingSession] = useState(false);
  console.log(isAuthenticated, user);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       await checkSession();
  //     } catch (e) {
  //       console.error("Failed to check session:", e);
  //     } finally {
  //       setIsCheckingSession(false);
  //     }
  //   };

  //   if (!isLoading && !isAuthenticated) {
  //     checkAuthStatus();
  //   }
  // }, [isLoading, isAuthenticated, checkSession]);

  useEffect(() => {
    const hasToken = localStorage.getItem("user");
    if (!isLoading && !hasToken) {
      if (isAuthenticated) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else if (!error) {
        loginWithRedirect();
      }
    }
  }, [isLoading, isAuthenticated, error, navigate, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {(isAuthenticated || localStorage.getItem("user")) && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default Sso;
