import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { createContext, useState ,useEffect} from "react";

export const UserContext = createContext();

function Layout() {
  
  const [UserData,setUserData] = useState(undefined)
  const [EventData,setEventdata] = useState([]);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);


  return (
    <>
      <UserContext.Provider value = {{UserData,setUserData,EventData,setEventdata}}>

        <Header />
        <Outlet />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default Layout;
