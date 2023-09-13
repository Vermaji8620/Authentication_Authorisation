const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// protected routes
// just authentication

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for tests",
  });
});

// below both are authentication

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected for the students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected for the admin",
  });
});

module.exports = router;
