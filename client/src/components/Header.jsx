import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Header = () => {
  const { isLoggedIn } = useAuth(); // ✅ Now global and reactive

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* 🍔 Logo */}
        <Link to={"/"}>
          <h1 className="text-red-500 text-3xl font-extrabold">
            Reciprok <span className="text-2xl font-bold text-black tracking-tight">Ate</span>
          </h1>
        </Link>

        <div className="flex-grow flex justify-center"></div>

        <Link to="/browse">
          <button className="mx-2 px-4 py-2 hover:cursor-pointer hover:text-red-500">
            Browse
          </button>
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/favourites" className="flex items-center space-x-1 hover:text-red-500">
                <span>Favorites</span>
              </Link>
              <Link to="/account">
                <button className="px-4 py-2 bg-red-500 text-gray-100 rounded-lg hover:bg-red-100 hover:text-red-800 cursor-pointer transition">
                  Account
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-red-500 text-gray-100 rounded-lg hover:bg-red-100 hover:text-red-800 cursor-pointer transition">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
