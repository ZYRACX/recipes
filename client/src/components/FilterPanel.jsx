import React, { useState } from "react";
import { X, Filter } from "lucide-react";

const FilterPanel = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* 🔘 Button to open Filter Panel */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="px-5 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
      >
        <Filter className="inline-block w-5 h-5 mr-2" />
        Open Filters
      </button>

      {/* 🌫️ Background Overlay + Panel */}
      {isFilterOpen && (
        <>
          {/* Dim & Blurred Background */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
            onClick={() => setIsFilterOpen(false)} // close on clicking outside
          />

          {/* 🧾 Filter Panel */}
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 p-6 flex flex-col transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filter Options</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Example Filter Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
                  <option>All</option>
                  <option>Veg</option>
                  <option>Non-Veg</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="w-full accent-red-600"
                />
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;
