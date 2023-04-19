const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const connectDB = require("../config/dbConn");

// .env file configuration
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoDbUrl = process.env.MONGO_DB_URL;
// connectDB(mongoDbUrl);

// routes define
const rootRoute = require("./routes/root");

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
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

app.use(errorHandler);

// DB connection
connectDB(mongoDbUrl);

// server listening
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
