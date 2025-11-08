import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import supabase from "../db.js";

const router = express.Router();

// Add favourite
router.post("/", verifyToken, async (req, res) => {
  const user_id = req.user.id;
  const { recipe_id } = req.body;
  console.log("User ID:", req.user.id, "Recipe ID:", recipe_id);

  if (!recipe_id) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id, recipe_id }]);

    if (error) throw error;

    res.json({ message: "Added to favourites!" });
  } catch (err) {
    console.error("Error adding favourite:", err.message);
    res.status(500).json({ error: "Failed to add favourite." });
  }
});


// Remove favorite
router.delete("/", verifyToken, async (req, res) => {
  const user_id = req.user.id;
  const { recipe_id } = req.body;

  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user_id)
      .eq("recipe_id", recipe_id);
    if (error) throw error;

    res.json({ message: "Removed from favorites!" });
  } catch (err) {
    console.error("Error removing favorite:", err.message);
    res.status(500).json({ error: "Failed to update favorites." });
  }
});

// Get all favorites for user
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.user.id;

  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("recipe_id")
      .eq("user_id", user_id);
    if (error) throw error;

    res.json(data.map(d => d.recipe_id));
  } catch (err) {
    console.error("Error fetching favorites:", err.message);
    res.status(500).json({ error: "Failed to fetch favorites." });
  }
});

export default router;
