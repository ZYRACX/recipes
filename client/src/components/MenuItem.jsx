import { Heart } from "lucide-react";

const MenuItem = ({ item, onfavourite, isFavourited }) => {
  const isVeg = item.type === "veg";

  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-white p-1">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            isVeg ? "border-green-600 bg-green-500" : "border-red-600 bg-red-500"
          }`}
          title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
        ></div>
      </div>

      <div className="absolute top-3 right-3">
        <span className="text-sm font-medium text-gray-800 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          {item.country}
        </span>
      </div>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          <button
            onClick={() => onfavourite?.(item)}
            className={`p-2 rounded-full hover:bg-red-100 transition ${
              isFavourited ? "shadow-lg animate-pulse" : ""
            }`}
            title={isFavourited ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavourited ? "text-red-600 fill-red-600" : "text-red-600"
              }`}
            />
          </button>
        </div>
        <p className="text-gray-700 mt-2 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuItem;
