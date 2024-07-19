import { Auth0Provider } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import AddEvent from "./components/AddEvent/AddEvent";
import Contact from "./components/Contact/Contact";
import EventReg from "./components/EventReg/EventReg";
import Events from "./components/EventsPage/Events";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { auth0Config } from "./components/oktaConfig/oktaConfig";
import Sso from "./components/SSO/Sso";
export const UserContext = createContext();

function App() {
  const [UserData, setUserData] = useState(undefined);
  const [EventData, setEventdata] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        redirectUri={auth0Config.redirectUri}
        audience={auth0Config.audience}
        scope={auth0Config.scope}
      >
        <UserContext.Provider
          value={{ UserData, setUserData, EventData, setEventdata }}
        >
          <Routes>
            <Route path="/" element={<Sso />}>
              <Route path="/home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="events" element={<Events />} />
              <Route path="eventreg" element={<EventReg />} />
              <Route path="addevent" element={<AddEvent />} />
              <Route path="/not-autorized" element={<h1>Not Authorized</h1>} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </Auth0Provider>
    </>
  );
}

export default App;
