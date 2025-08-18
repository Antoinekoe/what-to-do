import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import pool from "./configs/database.js";

// Import passport configuration
import "./configs/passport.js";

// Load environment variables
env.config();

const app = express();

app.set("trust proxy", 1);

// CORS (for development)
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Session configuration
const isProduction = process.env.NODE_ENV === "production";
const sessionSecret =
  process.env.SESSION_SECRET || (!isProduction ? "dev-secret-change-me" : null);

if (!sessionSecret) {
  console.error(
    "SESSION_SECRET is not set. Please define it in your environment (e.g., .env)."
  );
  process.exit(1);
}

app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
    },
    proxy: true,
    name: "what-to-do.sid",
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Ensure tables exist (basic bootstrap)
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      google_id TEXT
    );
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      emoji TEXT
    );
  `);
  // Ensure emoji column exists for existing databases
  await pool.query(`
    ALTER TABLE categories ADD COLUMN IF NOT EXISTS emoji TEXT;
  `);
}

ensureTables().catch((e) => {
  console.error("Failed to ensure tables:", e);
});

// Routes
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";

app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

export default app;
