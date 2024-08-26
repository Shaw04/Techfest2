import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import AddEvent from "./components/AddEvent/AddEvent";
import Contact from "./components/Contact/Contact";
import EventReg from "./components/EventReg/EventReg";
import Events from "./components/EventsPage/Events";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import Sso from "./components/SSO/Sso";

export const UserContext = createContext();

function App() {
  const [UserData, setUserData] = useState(undefined);
  const [EventData, setEventdata] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          UserData,
          setUserData,
          EventData,
          setEventdata,
          role,
          setRole,
        }}
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
    </>
  );
}

export default App;
