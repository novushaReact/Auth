import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { login, logout } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (username, password) => {
    const data = await login(username, password);
    setUser(data.user); // Update user state
  };

  const signOut = async () => {
    await logout();
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export const useAuth = () => useContext(AuthContext);
