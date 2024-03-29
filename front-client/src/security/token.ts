import { dataConnection } from "../app/@types/Connection";

export const haveToken = () => {
  if (localStorage.getItem("token") === null || undefined) {
    document.location.href = "/login";
  } else {
    const apiPath = process.env.API_HOST || "http://localhost:3001";
    fetch(apiPath + "/user/isUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token") || "",
      },
    }).then((res) => {
      res.json().then((data: dataConnection) => {
        if (!data.connection) {
          document.location.href = "/login";
        }
      });
    });
  }
};

export const haveTokenBail = async () => {
  if (localStorage.getItem("token") === null || undefined) {
    document.location.href = "/login";
  } else {
    const apiPath = process.env.API_HOST || "http://localhost:3001";
    const response = await fetch(apiPath + "/user/isBail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token") || "",
      },
    });
    const data: dataConnection = await response.json();
    return !data.connection;
  }
};
