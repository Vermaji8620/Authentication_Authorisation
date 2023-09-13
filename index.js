const express = require("express");
const app = express();

require("dotenv").config();

require("./config/database")();

app.use(express.json());

const todos = require("./routes/user");
app.use("/api/v1", todos);

app.get("/", (req, res) => {
  res.send(`<div>this is for practice</div>`);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server started successfully");
});
