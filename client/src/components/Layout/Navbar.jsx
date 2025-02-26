import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>
        <div>
          {user ? (
            <button onClick={signOut} className="hover:text-gray-200">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
