export const auth0Config = {
  domain: import.meta.env.VITE_DOMAIN,
  clientId: import.meta.env.VITE_CLIENT_ID,
  redirectUri: window.location.origin,
  audience: import.meta.env.VITE_AUDIENCE,
  scope: "openid profile email",
};
