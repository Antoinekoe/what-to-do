import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./database.js";

// Local authentication strategy
passport.use(
  "local",
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async function verify(email, password, cb) {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE email=$1 AND google_id IS NULL",
          [email]
        );
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password_hash;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false);
              }
            }
          });
        } else {
          return cb(null, false);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Session serialization
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
