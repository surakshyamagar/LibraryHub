import api from "./api";

// Get all users
export const getUsers = () => {
  return api.get("/users");
};

// Get single user
export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};