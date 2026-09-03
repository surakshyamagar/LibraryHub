import api from "./api";

export const loginUser = (loginData) => {
  return api.post("/auth/login", loginData);
};

export const registerUser = (registerData) => {
  return api.post("/users", registerData);
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};