import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Set in .env

// Create User
export const createUser = async (firstName, lastName) => {
  const response = await axios.post(
    `${API_URL}/api/hr/users`,
    { firstName, lastName },
    { withCredentials: true }
  );
  return response.data;
};

// Get Users
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/api/hr/users`, {
    withCredentials: true,
  });
  return response.data;
};