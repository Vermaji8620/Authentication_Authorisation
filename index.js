const express = require("express");
const app = express();

require("dotenv").config();
require("./config/database")();

// cookie k liye cookie-parser lagegea---------
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

const todos = require("./routes/user");
app.use("/api/v1", todos);

app.get("/", (req, res) => {
  res.send(`<div>this is for practice</div>`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started successfully");
});

// whats cookie-parser and why do we need it --------
