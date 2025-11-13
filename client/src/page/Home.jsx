// src/pages/Home.jsx
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home()  {
  return (
    <div className=" bg-gray-50 font-sans flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Discover Global Flavors
        </h1>
        <p className="text-gray-600 mt-3 max-w-lg">
          Explore authentic dishes from every corner of the world — curated with care and passion.
        </p>

    
      </section>

      {/* Explore Cuisines */}
      <section className="px-6 max-w-6xl mx-auto pb-10">
  <h2 className="text-4xl font-bold text-gray-900 mb-6 mx-50">Popular Cuisines</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
    {["Italian", "Indian", "Chinese", "Mexican", "Thai", "French", "Japanese", "Greek"].map(
      (cuisine) => (
        <button
  key={cuisine}
  className="inline-flex justify-center items-center px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition whitespace-nowrap"
>
  {cuisine}
</button>

      )
    )}
  </div>

  {/* ✅ Button centered here */}
  <div className="flex justify-center">
    <Link
      to="/browse"
      className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
    >
      Browse Recipes
    </Link>
  </div>
</section>


      {/* CTA */}
      <section className=" text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Love a recipe? Save it to your favourites ❤️
        </h3>
      </section>

    </div>
  );
};


