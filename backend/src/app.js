const express = require("express");
const app = express();
const path = require("path");

// .env file configuration
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// routes define
const rootRoute = require("./routes/root");

app.use("/", express.static(path.join(__dirname, "..", "/public")));
app.use("/", rootRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "/src/views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// server listening
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
