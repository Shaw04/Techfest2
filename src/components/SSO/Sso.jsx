import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { UserContext } from "../../App";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
import Header from "../Header";
import { useContext } from "react";

const Sso = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading, error } =
    useAuth0();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  console.log(isAuthenticated, user);

  useEffect(() => {
    const hasToken = localStorage.getItem("user");
    if (!isLoading && !hasToken) {
      if (isAuthenticated) {
        localStorage.setItem("user", JSON.stringify(user));
        setUserData(user);
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
