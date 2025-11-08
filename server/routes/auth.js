import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../db.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// 📝 Signup
router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const { data: existing } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert([
      { first_name, last_name, email, password: hashedPassword }
    ]);

    if (error) throw error;
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) return res.status(401).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id:user.id ,email: user.email, first_name: user.first_name, last_name: user.last_name },
      SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});


export default router;
