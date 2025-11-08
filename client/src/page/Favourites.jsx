import { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [favourites, setfavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // JWT token

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your favourites.");
      setLoading(false);
      return;
    }

    const fetchfavourites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/favourites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setfavourites(res.data || []); // Ensure empty array if none
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
        setError("Unable to load favourites.");
      } finally {
        setLoading(false);
      }
    };

    fetchfavourites();
  }, [token]);

  const handleRemove = async (recipeId) => {
    try {
      await axios.delete("http://localhost:5000/api/favourites", {
        headers: { Authorization: `Bearer ${token}` },
        data: { recipe_id: recipeId },
      });
      setfavourites((prev) => prev.filter((id) => id !== recipeId));
    } catch (err) {
      console.error("Failed to remove favourite:", err);
      alert("Failed to remove favourite.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading your favourites...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 text-lg font-medium">
        {error}
      </div>
    );

  if (!favourites.length)
    return (
      <div className="text-center py-20 text-gray-600">
        <p className="text-xl font-semibold mb-2">No recipes added yet ❤️</p>
        <p className="text-gray-500">
          Browse recipes and click the heart icon to add them here.
        </p>
        <Link
          to="/browse"
          className="mt-4 inline-block px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Browse Recipes
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          ❤️ Your Favourite Dishes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favourites.map((recipeId) => (
            <div
              key={recipeId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Replace with actual recipe details if needed */}
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Recipe ID: {recipeId}
                </h3>
                <button
                  onClick={() => handleRemove(recipeId)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <Heart className="w-5 h-5 fill-red-600 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Favourites;
