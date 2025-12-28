import api from "./client";

export const enablePrivateSpace = (token, data) =>
  api.post("/api/private/enable", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const verifyPin = (token, pin) =>
  api.post("/api/private/verify", { pin }, {
    headers: { Authorization: `Bearer ${token}` }
  });
