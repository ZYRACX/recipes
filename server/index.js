import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import recipesRoutes from "./routes/recipes.js";
import favouritesRoutes from "./routes/favourites.js";

dotenv.config();
const app = express();

const SECRET = process.env.JWT_SECRET;
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/favourites", favouritesRoutes);

app.use("/api/account", verifyToken, (req, res) => {
    const userData = req.user;
    res.json({
    message: "Protected route accessed!",
    user: userData,
  });
});

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
