import { useSearch } from "../context/SearchContext.jsx";

const SearchBar = ({ className = "" }) => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className={`flex items-center justify-center w-full max-w-md ${className}`}>
      <input
        type="text"
        placeholder="Search dishes, cuisines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button className="px-4 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
