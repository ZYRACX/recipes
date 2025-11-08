// src/context/FavouritesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { getUserFavourites, addFavourite, removeFavourite } from "../services/favouritesService.js";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      setFavourites([]);
      setLoading(false);
      return;
    }

    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const favs = await getUserFavourites(localStorage.getItem("token"));
        setFavourites(favs); // array of recipe IDs
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [isLoggedIn, user]);

  const toggleFavourite = async (recipeId) => {
    if (!isLoggedIn) {
      alert("Please log in to add favourites.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (favourites.includes(recipeId)) {
        await removeFavourite(recipeId, token);
        setFavourites(prev => prev.filter(id => id !== recipeId));
      } else {
        await addFavourite(recipeId, token);
        setFavourites(prev => [...prev, recipeId]);
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);
      alert("Failed to update favourite.");
    }
  };

  const isFavourite = (recipeId) => favourites.includes(recipeId);

  return (
    <FavouritesContext.Provider value={{ favourites, loading, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
