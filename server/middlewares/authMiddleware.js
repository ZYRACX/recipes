import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.JWT_SECRET;

// 🔒 Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expected format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // attach user data to request
    next(); // ✅ move on to next middleware or route handler
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
