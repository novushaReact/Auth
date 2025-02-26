import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Set in .env

// Login
export const login = async (username, password) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    { username, password },
    { withCredentials: true } // Include cookies
  );
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await axios.post(
    `${API_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

// Change Password
export const changePassword = async (currentPassword, newPassword) => {
  const response = await axios.post(
    `${API_URL}/api/auth/change-password`,
    { currentPassword, newPassword },
    { withCredentials: true }
  );
  return response.data;
};