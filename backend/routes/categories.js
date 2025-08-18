import express from "express";
import pool from "../configs/database.js";

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

router.use(ensureAuthenticated);

router.get("/", async (req, res) => {
  const userId = req.user.id;
  const result = await pool.query(
    "SELECT id, name, emoji FROM categories WHERE user_id = $1 ORDER BY id DESC",
    [userId]
  );
  res.json({ categories: result.rows });
});

router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { name, emoji } = req.body;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required" });
  }
  const result = await pool.query(
    "INSERT INTO categories (user_id, name, emoji) VALUES ($1, $2, $3) RETURNING id, name, emoji",
    [userId, name, emoji || null]
  );
  res.status(201).json({ category: result.rows[0] });
});

router.put("/:id", async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, emoji } = req.body;
  const result = await pool.query(
    "UPDATE categories SET name=$1, emoji=$2 WHERE id=$3 AND user_id=$4 RETURNING id, name, emoji",
    [name, emoji || null, id, userId]
  );
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });
  res.json({ category: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM categories WHERE id=$1 AND user_id=$2 RETURNING id",
    [id, userId]
  );
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
