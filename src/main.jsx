import React from "react";
import ReactDOM from "react-dom/client";
import { auth0Config } from "./components/oktaConfig/oktaConfig";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      redirectUri={auth0Config.redirectUri}
      audience={auth0Config.audience}
      scope={auth0Config.scope}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
