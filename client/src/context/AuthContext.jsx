import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch user data and favourites when token changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        setFavourites([]);
        return;
      }

      try {
        // Fetch user info (optional)
        const userRes = await axios.get("http://localhost:5000/api/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Fetch favourites
        const favRes = await axios.get("http://localhost:5000/api/favourites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favIds = favRes.data.map(f => f.recipeId);
        setFavourites(Array.from(new Set(favIds)));

        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setIsLoggedIn(false);
        setUser(null);
        setFavourites([]);
      }
    };

    fetchUserData();

    // Listen for login/logout in localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      if (!localStorage.getItem("token")) {
        setUser(null);
        setFavourites([]);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [token]);

  // Methods to update favourites
  const addFavourite = (id) => setFavourites(prev => Array.from(new Set([...prev, id])));
  const removeFavourite = (id) => setFavourites(prev => prev.filter(f => f !== id));

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      favourites,
      addFavourite,
      removeFavourite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
