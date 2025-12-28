import api from "./client";

export const getEntries = (token) =>
  api.get("/api/entries", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createEntry = (token, data) =>
  api.post("/api/entries", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteEntry = (token, id) =>
  api.delete(`/api/entries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
