const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //   check for the already existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "user already exists",
      });
    }

    // secure password
    let hashed_password;
    try {
      hashed_password = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "password cant be hashed",
        error: err.message,
      });
    }

    // create entry for the database
    const user = await User.create({
      name,
      email,
      password: hashed_password,
      role,
    });

    res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "give valid email and password",
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: " email is not found. Please sign up ",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      // passwrod is matched ....
      //  ab server jwt token behjega

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token; // user jo mila tha hmko database k andar mein usme 'token' naam ka ek aur field bana diya hai-------
      // await user.save(); // await kra ke save krna hga ...nai to jo token hm banane k bad store krna chah rahe hai user k andr wo user object k andar me store to hga lekin database me update nai hga....to user.save() krna hga hmko
      user.password = undefined; // hm us user wale object k andar me se password hata denge...taki passwrord send na ho sake response me jab hm jwt bhej rhe hai..server se client tak-----

      // ab cookie banana hai
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("vermajicookie", token, options).status(200).json({
        success: true,
        user,
        message: "user logged in successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: " password not matched. Incorrect password",
      });
    }
  } catch (err) {
    console.error = err;
    return res.status(500).json({
      message: err.message,
      error: "last cacth me error",
      success: false,
    });
  }
};
