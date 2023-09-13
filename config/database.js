const mongoose = require("mongoose");

require("dotenv").config();
const url = process.env.URL;

const mongoconnection = async () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    console.log("error connecting database");
    process.exit(1);
  }
};

module.exports = mongoconnection;
