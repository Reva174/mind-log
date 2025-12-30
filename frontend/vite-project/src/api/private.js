import client from "./client";

export const enablePrivateSpace = (token, data) =>
  client.post("/private/enable", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const verifyPrivatePin = (token, pin) =>
  client.post(
    "/private/verify",
    { pin },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const markAuthorNoteSeen = (token) =>
  client.post(
    "/private/author-note/seen",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
