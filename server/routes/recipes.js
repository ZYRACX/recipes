import express from "express";
import supabase from "../db.js";

const router = express.Router();

/**
 * @route GET /api/recipes
 * @desc Fetch only basic recipe info (no ingredients or steps)
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select(`
        recipes_id,
        recipes_name,
        recipes_description,
        recipes_country,
        recipes_type,
        recipes_imageUrl
      `);

    if (error) throw error;

    const formattedData = data.map((recipe) => ({
      id: recipe.recipes_id,
      name: recipe.recipes_name || "Unnamed Recipe",
      description: recipe.recipes_description || "No description available.",
      country: recipe.recipes_country || "Unknown",
      type: recipe.recipes_type || "Unknown",
      imageUrl: recipe.recipes_imageUrl?.startsWith("http")
        ? recipe.recipes_imageUrl
        : `https://yjvfprpuxyqjqdwnibln.supabase.co/storage/v1/object/public/recipes_images/${recipe.recipes_imageUrl}`,
    }));

    res.status(200).json({
      success: true,
      recipes: formattedData,
    });
  } catch (error) {
    console.error("❌ Error fetching recipes:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes",
      error: error.message,
    });
  }
});

export default router;
