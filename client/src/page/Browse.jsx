// src/pages/Browse.jsx
import React, { useState, useEffect, useMemo } from "react";
import MenuItem from "../components/MenuItem.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";
import { SlidersHorizontal, Leaf, Globe, X } from "lucide-react";

export const Browse = () => {
  const { searchTerm } = useSearch();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();
        if (data.success) setRecipes(data.recipes);
      } catch (err) {
        console.error("❌ Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const availableCountries = useMemo(() => [...new Set(recipes.map(r => r.country))].sort(), [recipes]);

  const filteredMenuItems = useMemo(
    () =>
      recipes.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const countryMatch = selectedCountries.length === 0 || selectedCountries.includes(item.country);
        const dietMatch =
          selectedDiets.length === 0 ||
          (selectedDiets.includes("Vegetarian") && item.type === "veg") ||
          (selectedDiets.includes("Non-Vegetarian") && item.type === "nonveg");
        return nameMatch && countryMatch && dietMatch;
      }),
    [recipes, searchTerm, selectedCountries, selectedDiets]
  );

  const toggleCountry = (country) => {
    setSelectedCountries(prev => (prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]));
  };

  const toggleDiet = (diet) => {
    setSelectedDiets(prev => (prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]));
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedDiets([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex justify-center items-center w-full py-6">
        <SearchBar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Today's Delicious Menu</h2>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 py-2 px-4 bg-white rounded-lg shadow-md text-gray-700 font-medium hover:bg-gray-100 border border-gray-200"
          >
            <SlidersHorizontal className="w-5 h-5 text-red-600" />
            <span>Preference</span>
            {(selectedCountries.length > 0 || selectedDiets.length > 0) && (
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading recipes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onfavourite={() => toggleFavourite(item.id)}
                  isFavourited={isFavourite(item.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-xl shadow-md">
                <p className="text-xl font-medium text-gray-600">No items found matching your filters.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Filter Panel */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsFilterOpen(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
            <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 p-6 relative pointer-events-auto">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <SlidersHorizontal className="w-6 h-6 mr-2 text-red-600" />
                Filter Menu
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-gray-500" /> By Country
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableCountries.map(country => (
                    <button
                      key={country}
                      onClick={() => toggleCountry(country)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedCountries.includes(country)
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-gray-500" /> By Diet
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Vegetarian', 'Non-Vegetarian'].map(diet => (
                    <button
                      key={diet}
                      onClick={() => toggleDiet(diet)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedDiets.includes(diet)
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={clearFilters}
                  className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
