// src/pages/Favourites.jsx
import { useEffect, useState } from "react";
import MenuItem from "../components/MenuItem.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";

const Favourites = () => {
  const { favourites, toggleFavourite, loading } = useFavourites();
  const [recipes, setRecipes] = useState([]);

  // Fetch all recipes to filter favourites
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();
        if (data.success) setRecipes(data.recipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const favouriteRecipes = recipes.filter(r => favourites.includes(r.id));

  if (loading) return <div className="text-center py-20 text-gray-500">Loading favourites...</div>;
  if (!favouriteRecipes.length)
    return (
      <div className="text-center py-20 text-gray-600">
        <p className="text-xl font-semibold mb-2">No recipes added yet ❤️</p>
        <p className="text-gray-500">Browse recipes and click the heart icon to add them here.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">❤️ Your Favourite Dishes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favouriteRecipes.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              onfavourite={() => toggleFavourite(item.id)}
              isFavourited={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Favourites;
