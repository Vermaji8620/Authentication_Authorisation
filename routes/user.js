const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// testing the route for single middleware
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for students",
  });
});

// // protected routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected for the students",
  });
});

// router.get("/admin", auth, isStudent, (req, res) => {
//   res.json({
//     success: true,
//     message: "Welcome to the protected for the admin",
//   });
// });

module.exports = router;
