// authentication , authorisation,

const jwt = require("jsonwebtoken");
require("dotenv").config();

// below middlware is used for authentication

// next ka mtalb hai ki kis middleware ka baad kon sa middleware start krna hai
exports.auth = async (req, res, next) => {
  try {
    // extract jwt token
    // pending --------- other ways to fetch the token
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }
    // token verification

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode; // req. k andar me store krlo
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// below both the middlewares are used for authorisation

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for students",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "user role is not matching",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for admin",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "user role is not matching",
    });
  }
};
