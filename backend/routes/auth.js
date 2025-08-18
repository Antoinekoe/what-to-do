import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import pool from "../configs/database.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) ON CONFLICT(email) DO NOTHING RETURNING id, email",
      [email, hashed]
    );
    if (result.rows.length === 0) {
      return res.status(409).json({ error: "User already exists" });
    }
    const user = result.rows[0];
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      return res.json({ user });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  (req, res) => {
    const user = req.user;
    res.json({ user: { id: user.id, email: user.email } });
  },
  (err, req, res, next) => {
    if (err) return res.status(500).json({ error: "Internal error" });
    return res.status(401).json({ error: "Invalid credentials" });
  }
);

router.post("/logout", (req, res) => {
  req.logout(() => {
    req.session?.destroy(() => {
      res.clearCookie("what-to-do.sid");
      res.json({ ok: true });
    });
  });
});

router.get("/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }
  const user = req.user;
  res.json({ user: { id: user.id, email: user.email } });
});

export default router;
