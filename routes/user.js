const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const User = require("../models/User");

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

router.get("/getEmail", auth, async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user: user,
      message: "Welcome to the email route ",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "code fatt gya ",
    });
  }
});

module.exports = router;
