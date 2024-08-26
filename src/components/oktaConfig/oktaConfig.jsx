export const auth0Config = {
  domain: import.meta.env.VITE_DOMAIN,
  clientId: import.meta.env.VITE_CLIENT_ID,
  redirectUri: "http://localhost:8081/auth/callback",
  audience: import.meta.env.VITE_AUDIENCE,
  scope: "openid profile email",
};
